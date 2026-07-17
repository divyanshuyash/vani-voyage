# Vani's Voice Voyage

Marketing website for Vani Sumanth's communication, confidence, webinar, and
one-to-one coaching programs.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before deploying, run:

```bash
npm run lint
npm run build
```

## Updating the live webinar schedule

The `/live-webinar` page reads the `DATE` and `TIME` cells from the published
Google Sheet configured in `src/data/webinar.ts`. Edit the second row of the
original Google Sheet; Google saves automatically and the website refreshes the
published schedule within a few minutes.
