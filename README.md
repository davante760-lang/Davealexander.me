# Dave Alexander — Enterprise AE Portfolio

Dave Alexander’s interview portfolio, built with React, Vite, and Tailwind CSS. It includes career experience, performance highlights, a downloadable resume, and ten linked deal stories.

Live site: [dalexander.up.railway.app](https://dalexander.up.railway.app/)

## Run locally

Use Node.js 22.12 or newer:

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run build
node --test server.test.js
node server.js
```

The production server serves only files from `dist/` and provides `/health`. It listens on Railway's `PORT`, or port 3000 locally.

## Deploy

Push to `main` in `davante760-lang/Davealexander.me`. Railway builds with the two-stage Dockerfile and serves the compiled site. `railway.json` sets the production command and health check.

## Update deal stories

Card details live in `src/data/dealCards.js`. Story content lives in the story modules under `src/data/`, collected by `dealStories.js`. `src/components/DealStory.jsx` provides the shared page layout.

Each story has an HTML entry under `deals/<slug>/index.html` for its page title and sharing description. Keep these metadata descriptions in sync when changing a story. Vite discovers the entries during the build, and the server supports the clean `/deals/<slug>/` URLs.
