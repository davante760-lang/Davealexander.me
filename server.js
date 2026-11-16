import { createServer } from 'node:http';
import { open } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const types = {
  html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8', svg: 'image/svg+xml', png: 'image/png',
  jpg: 'image/jpeg', webp: 'image/webp', woff2: 'font/woff2', pdf: 'application/pdf',
  mp4: 'video/mp4', vtt: 'text/vtt; charset=utf-8',
};
function collectAssets(assetDirectory, assets, directory = '') {
  for (const entry of readdirSync(join(assetDirectory, directory), { withFileTypes: true })) {
    const name = directory + entry.name;
    if (entry.isDirectory()) collectAssets(assetDirectory, assets, name + '/');
    else if (entry.isFile()) assets.set('/' + name, [join(assetDirectory, name), types[name.split('.').pop()] || 'application/octet-stream']);
  }
}

// null means ignore an unsupported range; false means an invalid/unsatisfiable byte range.
function parseByteRange(value, size) {
  if (!value || !/^bytes=/i.test(value) || value.includes(',')) return null;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value);
  if (!match || (!match[1] && !match[2]) || size === 0) return false;
  const length = BigInt(size);
  let start;
  let end;
  if (!match[1]) {
    const suffix = BigInt(match[2]);
    if (suffix === 0n) return false;
    start = suffix >= length ? 0n : length - suffix;
    end = length - 1n;
  } else {
    start = BigInt(match[1]);
    end = match[2] ? BigInt(match[2]) : length - 1n;
    if (start >= length || end < start) return false;
    if (end >= length) end = length - 1n;
  }
  return { start: Number(start), end: Number(end) };
}

export function createSiteServer({ assetDirectory = fileURLToPath(new URL('./dist/', import.meta.url)) } = {}) {
  const assets = new Map();
  collectAssets(assetDirectory, assets);
  assets.set('/', assets.get('/index.html'));
  for (const [path, asset] of [...assets]) {
    if (/^\/(?:deals|losses)\/[^/]+\/index\.html$/.test(path)) {
      const route = path.slice(0, -'/index.html'.length);
      assets.set(route, asset);
      assets.set(route + '/', asset);
    }
  }

  return createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('X-Frame-Options', 'SAMEORIGIN');
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }
    let path;
    try { path = new URL(request.url, 'http://localhost').pathname; }
    catch { response.writeHead(400); response.end(); return; }
    if (path === '/health') {
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : 'ok');
      return;
    }
    const asset = assets.get(path);
    if (!asset) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : 'Page not found');
      return;
    }
    let file;
    try {
      file = await open(asset[0], 'r');
      const { size } = await file.stat();
      if (response.destroyed) {
        await file.close();
        file = undefined;
        return;
      }
      // Range applies only to GET. Without validators, an If-Range request needs the full file.
      const range = request.method === 'GET' && !request.headers['if-range']
        ? parseByteRange(request.headers.range, size)
        : null;
      if (range === false) {
        await file.close();
        file = undefined;
        response.writeHead(416, {
          'Content-Range': `bytes */${size}`,
          'Content-Length': 0,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-cache',
        });
        response.end();
        return;
      }
      const headers = {
        'Content-Type': asset[1],
        'Content-Length': range ? range.end - range.start + 1 : size,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
      };
      if (range) headers['Content-Range'] = `bytes ${range.start}-${range.end}/${size}`;
      if (request.method === 'HEAD') {
        await file.close();
        file = undefined;
        response.writeHead(200, headers);
        response.end();
        return;
      }
      const stream = file.createReadStream(range || {});
      file = undefined; // The stream owns and closes the file descriptor, including on disconnect.
      const stopStream = () => stream.destroy();
      response.once('close', stopStream);
      stream.once('close', () => response.off('close', stopStream));
      stream.once('error', error => response.destroy(error));
      response.writeHead(range ? 206 : 200, headers);
      stream.pipe(response);
    } catch {
      if (file) await file.close().catch(() => {});
      if (response.headersSent) { response.destroy(); return; }
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : 'Unable to load page');
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('PORT must be a valid port number');
  }
  const server = createSiteServer();
  server.listen(port, '0.0.0.0', () => console.log(`Site running on port ${port}`));
  const stop = () => server.close(() => process.exit(0));
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}
