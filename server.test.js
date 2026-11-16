import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSiteServer } from './server.js';

test('serves site assets and health without exposing repository files', async (t) => {
  const server = createSiteServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const home = await fetch(origin);
  assert.equal(home.status, 200);
  const html = await home.text();
  assert.match(html, /Dave Alexander/);
  const bundlePaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(match => match[1]);
  assert.ok(bundlePaths.some(path => path.endsWith('.js')));
  assert.ok(bundlePaths.some(path => path.endsWith('.css')));
  for (const [path, type] of [
    ...bundlePaths.map(path => [path, path.endsWith('.js') ? 'text/javascript' : 'text/css']),
    ['/fonts/Geist-Variable.woff2','font/woff2'], ['/family.jpg','image/jpeg'],
    ['/logo-samsara.png','image/png'], ['/logo-applied.png','image/png'], ['/logo-ezlynx.png','image/png'],
    ['/DaveAlexanderResume.pdf','application/pdf'], ['/excelsior-ambulance.webp','image/webp'],
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get('content-type').includes(type));
  }
  assert.equal(await (await fetch(origin + '/health')).text(), 'ok');
  const head = await fetch(origin, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal((await fetch(origin, { method: 'POST' })).status, 405);
  for (const path of ['/server.js', '/.env', '/package.json', '/%2e%2e/server.js', '/missing']) {
    assert.equal((await fetch(origin + path)).status, 404);
  }
});

test('serves distinct win and loss stories through direct URLs and route aliases', async (t) => {
  const assetDirectory = await mkdtemp(join(tmpdir(), 'dave-site-stories-'));
  const stories = [
    ['deals/kenco', '<title>Win story fixture</title>'],
    ['losses/kenco', '<title>Kenco loss story fixture</title>'],
    ['losses/tcw', '<title>TCW loss story fixture</title>'],
  ];
  await writeFile(join(assetDirectory, 'index.html'), '<title>Home fixture</title>');
  for (const [route, html] of stories) {
    await mkdir(join(assetDirectory, route), { recursive: true });
    await writeFile(join(assetDirectory, route, 'index.html'), html);
  }
  const server = createSiteServer({ assetDirectory });
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(assetDirectory, { recursive: true, force: true });
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;

  for (const [route, html] of stories) {
    for (const suffix of ['', '/', '/index.html', '/?source=portfolio']) {
      const response = await fetch(`${origin}/${route}${suffix}`);
      assert.equal(response.status, 200, route + suffix);
      assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
      assert.equal(await response.text(), html, route + suffix);
    }
  }
  const head = await fetch(origin + '/losses/tcw', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(head.headers.get('content-length'), String(Buffer.byteLength(stories[2][1])));
  assert.equal(await head.text(), '');
  for (const route of ['/losses/missing/', '/deals/missing/', '/losses/', '/losses/tcw/extra']) {
    assert.equal((await fetch(origin + route)).status, 404, route);
  }
});

test('serves video with seekable byte ranges and body-free HEAD responses', async (t) => {
  const assetDirectory = await mkdtemp(join(tmpdir(), 'dave-site-video-'));
  // This small transport fixture exercises byte-for-byte responses, not video decoding.
  const video = Buffer.from('A small video transport fixture with distinct beginning and ending bytes.');
  await mkdir(join(assetDirectory, 'media'));
  await writeFile(join(assetDirectory, 'index.html'), '<title>Video fixture</title>');
  await writeFile(join(assetDirectory, 'media', 'intro.mp4'), video);
  await writeFile(join(assetDirectory, 'media', 'empty.mp4'), '');
  await writeFile(join(assetDirectory, 'media', 'captions.vtt'), 'WEBVTT\n\n');
  const server = createSiteServer({ assetDirectory });
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(assetDirectory, { recursive: true, force: true });
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const url = origin + '/media/intro.mp4';

  await t.test('initial playback returns the full MP4 with its MIME and length', async () => {
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'video/mp4');
    assert.equal(response.headers.get('content-length'), String(video.length));
    assert.equal(response.headers.get('accept-ranges'), 'bytes');
    assert.equal(response.headers.get('content-range'), null);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), video);
    const captions = await fetch(origin + '/media/captions.vtt');
    assert.equal(captions.headers.get('content-type'), 'text/vtt; charset=utf-8');
    assert.equal(await captions.text(), 'WEBVTT\n\n');
  });

  for (const [range, start, end] of [
    ['bytes=0-1', 0, 1],
    ['bytes=8-19', 8, 19],
    ['bytes=20-', 20, video.length - 1],
    ['bytes=-9', video.length - 9, video.length - 1],
    ['bytes=-999', 0, video.length - 1],
    ['bytes=5-999999999999999999999999', 5, video.length - 1],
  ]) {
    await t.test(`seeks with ${range}`, async () => {
      const response = await fetch(url, { headers: { Range: range } });
      assert.equal(response.status, 206);
      assert.equal(response.headers.get('content-type'), 'video/mp4');
      assert.equal(response.headers.get('accept-ranges'), 'bytes');
      assert.equal(response.headers.get('content-range'), `bytes ${start}-${end}/${video.length}`);
      assert.equal(response.headers.get('content-length'), String(end - start + 1));
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), video.subarray(start, end + 1));
    });
  }

  await t.test('rejects malformed and unsatisfiable byte ranges without leaking a body', async () => {
    for (const range of ['bytes=-', 'bytes=7-3', `bytes=${video.length}-`, 'bytes=-0', 'bytes=bad-9', 'bytes=9007199254740993-']) {
      const response = await fetch(url, { headers: { Range: range } });
      assert.equal(response.status, 416, range);
      assert.equal(response.headers.get('content-range'), `bytes */${video.length}`, range);
      assert.equal(response.headers.get('content-length'), '0', range);
      assert.equal((await response.arrayBuffer()).byteLength, 0, range);
    }
    const empty = await fetch(origin + '/media/empty.mp4', { headers: { Range: 'bytes=0-' } });
    assert.equal(empty.status, 416);
    assert.equal(empty.headers.get('content-range'), 'bytes */0');
    assert.equal(await empty.text(), '');
  });

  await t.test('ignores unsupported range units, multiple ranges, and unmatched If-Range', async () => {
    for (const headers of [
      { Range: 'items=0-1' },
      { Range: 'bytes=0-1,5-6' },
      { Range: 'bytes=0-1', 'If-Range': '"old-version"' },
    ]) {
      const response = await fetch(url, { headers });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-range'), null);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), video);
    }
  });

  await t.test('HEAD returns full metadata and ignores Range as required for non-GET requests', async () => {
    for (const headers of [{}, { Range: 'bytes=0-1' }, { Range: 'bytes=999999-' }]) {
      const response = await fetch(url, { method: 'HEAD', headers });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), 'video/mp4');
      assert.equal(response.headers.get('content-length'), String(video.length));
      assert.equal(response.headers.get('accept-ranges'), 'bytes');
      assert.equal(response.headers.get('content-range'), null);
      assert.equal((await response.arrayBuffer()).byteLength, 0);
    }
  });

  await t.test('range requests preserve the asset allowlist and method restriction', async () => {
    assert.equal((await fetch(origin + '/server.js', { headers: { Range: 'bytes=0-1' } })).status, 404);
    assert.equal((await fetch(url, { method: 'POST', headers: { Range: 'bytes=0-1' } })).status, 405);
  });
});
