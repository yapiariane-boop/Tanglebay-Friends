# Tanglebay’s Friends — Phase 1

A responsive, story-led structural prototype. All episode information, artwork, activity logistics and PDFs are explicitly placeholders. Activity names and descriptions come from the project brief.

## Run locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Validate with `npm test` and `npm run build`. Use `npm run preview` to serve the production build. No credentials, database or external services are required.

## Information and technical architecture

Home → Episodes → Episode activities → Play setup → Ordered facilitation → Ready to Print → Variant-specific files.

React and TypeScript render shared screens from `src/content.ts`. Vite provides development and production builds. Hash navigation supports browser back/forward and static hosting without server rewrite configuration. Each navigation focuses the page heading; controls use native links/buttons, progress is labelled, and reduced-motion preferences are respected.

- **Episodes** have stable IDs, placeholder titles and descriptions.
- **Activities** have identity, description, artwork metadata and an array of episode IDs. This permits many-to-many associations without duplicating activities.
- **Variants** are explicitly keyed `home` and `group`, with independent player guidance, duration, ordered steps, printing guidance and file lists.
- **Steps** have stable IDs, titles, body text and optional list items. Change their order in the array, or insert/remove steps; the UI calculates progress automatically.
- **Files** have stable IDs, title, URL, copy guidance and optional status. Lists need not be equal between variants. Placeholder PDFs live in `public/packs`.

To replace artwork, add a path to an activity’s `artwork.src` and meaningful `artwork.alt`. Replace files and edit URLs in the variant data. No page redesign is required. The same schema can later be loaded from validated JSON or a CMS without introducing one now.

## Structural decisions and limitations

Episode associations are illustrative and need author approval. Discussion Cards appears in both placeholder episodes to demonstrate reuse. Home and Group logistics are illustrative, not final rules. The investigation variant demonstrates an additional reveal step and optional evidence file.

Print links appear only after completing the selected variant’s preparation. Progress is in memory: refresh resets preparation, changing setup starts at step one, and direct links to later steps or print show a continuation prompt. This is a journey guard, not access control: static PDF URLs are public. If bookmarks or durable progress become necessary, introduce versioned session storage so edited guidance does not inherit stale completion.

Future content should define real episode associations, participant roles, safety considerations, reveal order, page counts and printing settings per variant. Keep facilitator-only reveal guidance separate from player materials. Those distinctions already fit the data model. No authentication, payment, database, official character artwork or production deployment is included.

## Checks

`npm test` exercises the full Home and Group journey, file selection, setup switching, preparation guards and data/file references. `npm run build` type-checks and produces `dist`. The PDFs are valid one-page labelled demonstration documents, not final playable resources.

## Publish with GitHub Pages

Push this project to the repository's `main` branch. In GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. The **Publish website** workflow builds and tests the app, then deploys `dist`. Further pushes to `main` update the same site. No custom domain is required. Publishing makes bundled illustrations and printable files publicly accessible.

Relative asset paths support the repository URL `/Tanglebay-Friends/` and a custom domain. Hash navigation needs no server rewrites. This differs from publishing the Codex cloud environment, which saves the development environment and does not host a public website.

Discussion Cards Group guidance uses five authored steps with optional `visual` keys. `GuidanceAnimation.tsx` renders lightweight silhouettes, cards, speech bubbles and books using CSS and inline SVG. Animations start paused, stop outside the viewport or a visible browser tab, and respect reduced-motion preferences. Each step mounts a fresh player. These are explanatory loops; the illustrated timer does not run the actual group discussion. Group PDFs and copy requirements remain placeholders until supplied by the author.
