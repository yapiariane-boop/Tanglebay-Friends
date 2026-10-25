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

5 Seconds for a Stand has five Home steps and seven distinct Group steps. Group setup adds facilitator-defined player/judge rotation and a central table with the board, opposing Players and Judges initially facing them. Players choose in five seconds; Judges have ten seconds to take an initial side before arguments and ten seconds to reposition afterwards. Only the final headcount behind each Player scores; a Judge behind neither Player at the final buzzer has no vote. CSS/SVG overhead examples demonstrate movement. Identical positions are allowed; identical arguments or an equal final tally produce a draw. The visual timers are explanatory, not working game timers. The five-page author-supplied Stand PDF is shared by Home and Group: board on page 1, 3D templates on pages 2–4, questions on page 5. The Group Facilitation Guide remains marked Coming soon.

The Stand Group print page includes a lightweight CSS 3D assembly illustration using page 2 of the supplied PDF as the DISAGREE face artwork and page 1 as the board. It supports play/pause and four manually selectable stages, stops outside the viewport or visible tab, and provides static stages for reduced motion. Full template tabs remain available in an expandable preview. The last Group guidance step invites children to create more questions and continue using the same rotation and scoring rules.

The Wild Path has two stacked guidance sections for both Home and Group: Prepare the Game (five steps), followed by How to Play (five steps). Edit each variant's `guidanceSections` data to add the authored text; `steps` is derived by flattening those sections so routing and print readiness stay in order. The second section becomes available after preparation, and printing follows all ten steps. Home preparation now contains the five authored instructions in `wildPathHomePreparation`, with bold lead instructions, supporting text and a closing invitation to build teams. Home gameplay contains the five authored instructions in `wildPathHomeGameplay`, including four random Character Cards, the Team Leader, movement, explained Good Picks and creative challenge outcomes. Group preparation contains the five authored steps in `wildPathGroupPreparation`: one pack and table per team, hidden matching Team IDs, and a shared draw station where each player draws one ID and one Character Card before joining their table. Group gameplay contains the five authored instructions in `wildPathGroupGameplay`: a shared Team Leader, rotating Roller, card-holder explanations, collaborative creative solutions, challenge outcomes and the first team to finish winning. Both modes now have authored content in all ten steps. Each section tracks whether its content is provisional.

The Wild Path Home and Group packs share the unmodified eight-page author PDF `public/packs/the-wild-path-home-pack.pdf` (about 29 MB). It is a download link, not an embedded viewer or a preloaded document. The print screen lists its components and notes the large mixed custom page sizes. The Facilitation Guide is marked Coming soon.

Inside Dimitri’s Lab and Officer’s Investigation Notebook use two five-step guidance sections for both Home and Group. Investigation Group preparation forms teams before printing one 13-page kit per team, selects four actors (Bridget, Octena, Deedee and Moow), keeps scripts with the facilitator as Honey, and gathers scissors, glue, pens and scrap paper. Gameplay starts with crafting a department hat, then Bridget’s opening interview. Three challenge → suspect interview cycles follow, with five minutes after every interview for official notes. Teams complete three Suspect Files and a Final Report before departmental presentations and Honey’s reveal. Estimated duration is 45–60 minutes. Lab Home still awaits author content.

Officer’s Investigation Notebook reserves two print areas in both setups: Team Kit and Facilitator File. The Group Team Kit uses the author-supplied 13-page PDF `public/packs/officers-investigation-group-team-kit.pdf` (about 23 MB); the Home version uses its own author-supplied 22-page notebook. The Group Facilitator File uses the author-supplied 15-page PDF `public/packs/officers-investigation-group-facilitator.pdf` (about 28 MB), separate from the Team Kit; Home has a single notebook download. Earlier example evidence and guide downloads are not presented as additional packs.

Sectioned steps support optional `prompts` callouts and `after` text so response stems and reflection questions remain distinct while preserving the intended instruction order.

Investigation Group gameplay separates Teams and Facilitator responsibilities in every step. Children craft one shared hat per team. Home has four preparation and four gameplay steps, ages 7–11 with adult reading support recommended for ages 7–9, and an estimated duration of 45–90 minutes or several sessions. Its 22-page PDF is `public/packs/officers-investigation-home-notebook.pdf` (about 3.3 MB). The supplied PDF still says 23 pages on its introduction and references a final reveal that is not included; these require an author revision.

Dimitri’s Lab Group has four preparation steps and five gameplay steps with Researchers/Facilitator roles. Read Tanglebay Biology Secrets first, form teams before printing, then progress from individual research to team research, the Research Fair and a credited Final Research Summary. Separate downloads use the author-supplied Research Guidance Sheet (1 page, one copy per child) and Complete Lab Pack (6 pages, one copy per team). PDFs are stored unchanged as `public/packs/dimitris-lab-research-guidance-sheet.pdf` and `public/packs/dimitris-lab-group-team-kit.pdf`.

Dimitri’s Lab Home downloads the author-supplied six-page PDF `public/packs/dimitris-lab-home-kit.pdf` (about 7.1 MB). Home preparation and gameplay instructions are still pending.
