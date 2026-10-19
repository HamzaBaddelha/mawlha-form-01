# مولها — campaign financing form

Standalone mobile-first Arabic RTL React + TypeScript + Vite form. Two validated steps (personal details, then financing details including financial obligations), accessible errors, back navigation, loading/retry/confirmed success states and an explicitly labeled development preview. Customer data stays in React memory; no logging, local storage or analytics.

## Run

```sh
npm install
npm run dev
```

`npm run start` also starts Vite. `npm run typecheck`, `npm test`, and `npm run build` verify the project. Build output is `dist/` for static hosting. The Vite development server is not the production hosting server.

## Configuration

- Branding: edit tokens at the top of `src/styles.css`; text wordmark is in `src/main.tsx`. Green/white colors follow the supplied swatches provisionally. No verified logo or font assets were available. The system Arabic font stack needs no external font request.
- Cities: edit the city options in `src/data.ts`.
- API: copy `.env.example` to `.env`, set `VITE_FINANCING_API_URL` to a compatible endpoint and restart/rebuild. Vite environment values are public; do not add secrets. No endpoint means preview only, with no network submission and no live success message.
- UTM: captured independently in `src/service.ts`; sent only when the backend supports `campaign` and `VITE_API_SUPPORTS_UTM=true`.
- Backend changes: see `BACKEND-MAPPING.md`. The old DTO remains unchanged.

## Assumptions and missing inputs

Only the DTO and pasted request were available in the workspace/attachment files. The named DOCX and VS Code screenshot were not available for inspection. The four chat images display white and green color swatches. Branding is provisional, including the temporary مولها wordmark and system typography. No actual API was supplied.

City is optional. “لا يوجد” was added to complete the obligations question; neither answer is preselected. No obligations amount or uploads were invented. File uploads remain unresolved because no document types or requirements were defined.

On API failure values remain in the form and the final button retries. Requests time out after 20 seconds. Reloading closes this in-memory application and clears entered values.

## Verification

Production build, TypeScript check, and five Node validation/payload tests passed. The local server returned HTTP 200 for the page and transformed React entry. Browser automation reported no available browser, so visual mobile/desktop verification and interactive end-to-end checks remain unverified. No compatible real API was available to exercise live success or failure responses. Before launch, verify navigation, both obligations choices and error/retry behavior against the configured API on mobile and desktop.
