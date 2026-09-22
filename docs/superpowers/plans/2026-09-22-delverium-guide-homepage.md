# Delverium Guide Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally reviewable, English, source-disciplined Delverium Guide homepage from AnvilWiki without public deployment.

**Architecture:** Clone the upstream AnvilWiki repository into the current workspace and preserve its Astro static-site architecture. Configure the site identity in the existing config layer, isolate homepage-only composition in a dedicated Astro component, and keep the root page as a small route wrapper. Add focused Vitest assertions against rendered homepage output and existing SEO configuration so the review page cannot regress into unsupported claims or misleading links.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 3, MDX/Content Collections, Vitest, Pagefind.

**Spec:** `docs/superpowers/specs/2026-09-22-delverium-guide-homepage-design.md`

## Global Constraints

- Use AnvilWiki as the upstream base; first inspect the cloned revision before modifying source files.
- The site language is English and its public identity is `Delverium Guide` at `https://delveriumguide.com`.
- The only deliverable is a local review homepage; do not create a GitHub repo, deploy to Cloudflare, change DNS, or publish the domain.
- Game facts must be traceable to official Steam/Sagestone information or clearly labeled evidence; no AI-invented gameplay claims, builds, recipes, rankings, or stats.
- Keep the root page statically generated, no-JavaScript dependent, keyboard accessible, responsive below 768px, and free of new runtime dependencies, Google Fonts, embeds, scraped art, or unrelated AI imagery.
- Preserve upstream sitemap, robots, Open Graph, and JSON-LD behavior; change only site-specific values.

## Review Focus

- A local preview must not accidentally advertise `pages.dev`, an unconfigured demo domain, or claim that the site is official.
- All six guide-map destinations must be honest: existing destinations resolve, and unavailable content receives a visible non-link preparation state.
- The root document must contain exactly one H1 and preserve a meaningful heading order for screen-reader navigation.
- Mobile width must use a single-column guide map with links large enough to tap and with no clipped horizontal content.
- The title and description must include `Delverium guide` naturally without copying the game’s marketing copy or making unverified claims.

## File Structure

- `src/config/site.ts` — existing single source of truth for site identity, game identity, canonical URL, social/official references, and legal notice.
- `src/config/navigation.ts` — existing global navigation items; restrict the preview navigation to destinations that exist or to in-page anchors.
- `src/components/DelveriumHomepage.astro` — new, isolated, semantic homepage composition and local CSS tokens for the hero, guide map, trust strip, editorial policy, and footer treatment.
- `src/pages/index.astro` — existing root route; import the new component and provide root-page metadata through upstream layout conventions.
- `src/styles/global.css` or existing theme/token stylesheet discovered during Task 1 — add only the graphite/parchment/copper/moss tokens used by the new component, following the upstream stylesheet ownership pattern.
- `tests/seo.test.ts` — existing Vitest test suite; extend with Delverium site-config and root metadata assertions.
- `tests/homepage.test.ts` — new Vitest test that reads rendered/static homepage output using the test helper pattern identified in Task 1.

### Task 1: Acquire and map the upstream project

**Files:**
- Create: upstream AnvilWiki working tree at the current workspace root.
- Modify: none.
- Test: none; this task establishes the exact existing test and layout interfaces.

**Interfaces:**
- Consumes: upstream repository `https://github.com/PNGTRID/AnvilWiki.git`.
- Produces: a clean local Git checkout; a recorded map of the root route, layout, stylesheet, and Vitest render-test helper used by Tasks 2–4.

- [ ] **Step 1: Clone the upstream repository into an empty temporary directory and verify its revision**

Run:

```bash
git clone --depth 1 https://github.com/PNGTRID/AnvilWiki.git work/anvilwiki-upstream
git -C work/anvilwiki-upstream rev-parse --short HEAD
git -C work/anvilwiki-upstream status --short
```

Expected: a printed commit SHA and no status output.

- [ ] **Step 2: Inspect the exact homepage, shared layout, configuration, stylesheet, and tests before any product edit**

Run:

```bash
rg -n "<h1|Layout|site\.name|SITE_URL|describe\(" work/anvilwiki-upstream/src/pages/index.astro work/anvilwiki-upstream/src/components work/anvilwiki-upstream/src/config work/anvilwiki-upstream/src/styles work/anvilwiki-upstream/tests
```

Expected: the command identifies the route wrapper, its layout import, the applicable token stylesheet, and the existing Vitest test idiom.

- [ ] **Step 3: Install the declared package-manager version and establish a green upstream baseline**

Run:

```bash
pnpm --dir work/anvilwiki-upstream install --frozen-lockfile
pnpm --dir work/anvilwiki-upstream check
pnpm --dir work/anvilwiki-upstream test
pnpm --dir work/anvilwiki-upstream build
```

Expected: all commands exit successfully; save any upstream-only failure verbatim before proceeding.

- [ ] **Step 4: Move the verified checkout into the review workspace without changing its Git history**

Run:

```bash
rsync -a --exclude .git work/anvilwiki-upstream/ ./
git init
git add .
git commit -m "chore: import AnvilWiki baseline"
```

Expected: the current workspace now contains the upstream files and one local baseline commit. Do not push or add a remote.

### Task 2: Set up Delverium identity and SEO facts

**Files:**
- Modify: `src/config/site.ts`, `src/config/navigation.ts`, the Astro site URL configuration file identified in Task 1, and `tests/seo.test.ts`.
- Test: `tests/seo.test.ts`.

**Interfaces:**
- Consumes: the `site: SiteConfig` export from `src/config/site.ts` and the official Steam product URL `https://store.steampowered.com/app/2710040/Delverium/`.
- Produces: `site.name === 'Delverium Guide'`, `site.domain === 'delveriumguide.com'`, an English factual description containing `Delverium guide`, and an official Steam URL that later components may render.

- [ ] **Step 1: Add a failing SEO/configuration test before changing the site configuration**

Add assertions following the existing `tests/seo.test.ts` style:

```ts
expect(site.name).toBe('Delverium Guide');
expect(site.domain).toBe('delveriumguide.com');
expect(site.description).toMatch(/Delverium guide/i);
expect(site.social.official).toBe('https://store.steampowered.com/app/2710040/Delverium/');
expect(site.legalNotice).toMatch(/unofficial/i);
```

- [ ] **Step 2: Run the focused test and verify that it fails due to demo configuration**

Run:

```bash
pnpm test -- tests/seo.test.ts
```

Expected: FAIL because the imported site configuration still names Anvil Quest or its demo domain.

- [ ] **Step 3: Implement the minimum source-grounded configuration**

In `src/config/site.ts`, set the site name, short name, domain, canonical description, tagline, unofficial legal notice, Steam URL, developer (`Sagestone Games`), platform (`Steam`), genre, and release date using only official-store/official-announcement facts. Replace demo `sameAs` values with official Delverium URLs only. In the existing Astro config, set `site` to `https://delveriumguide.com` following the file’s current syntax. In `src/config/navigation.ts`, remove any demo-only landing link and retain only valid root/in-page or existing legal links.

- [ ] **Step 4: Run focused and whole project checks**

Run:

```bash
pnpm test -- tests/seo.test.ts
pnpm check
pnpm lint
```

Expected: all commands pass and no navigation item points to a deleted demo route.

- [ ] **Step 5: Commit the verified configuration change**

Run:

```bash
git add src/config/site.ts src/config/navigation.ts astro.config.ts tests/seo.test.ts
git commit -m "feat: configure Delverium Guide identity"
```

### Task 3: Implement the semantic review homepage with test-first coverage

**Files:**
- Create: `src/components/DelveriumHomepage.astro`, `tests/homepage.test.ts`.
- Modify: `src/pages/index.astro`, the existing global/theme stylesheet identified in Task 1.
- Test: `tests/homepage.test.ts`.

**Interfaces:**
- Consumes: `site` from `src/config/site.ts`; the root-layout metadata API discovered in Task 1.
- Produces: `<DelveriumHomepage />`, a root-rendered page with one H1, six guide topics, official-source wording, and visible non-links for unpublished topics.

- [ ] **Step 1: Write a failing homepage test against the static rendered HTML**

Use the upstream test helper discovered in Task 1; if the project has no HTML-render helper, invoke `astro build` in the test setup and read `dist/index.html`. Assert these observable requirements:

```ts
expect(html).toMatch(/<h1[^>]*>\s*Delverium Guide\s*<\/h1>/i);
expect((html.match(/<h1\b/gi) ?? []).length).toBe(1);
for (const topic of ['Getting Started', 'Co-op', 'Crafting', 'Farming & Building', 'Dungeons', 'Updates']) {
  expect(html).toContain(topic);
}
expect(html).toMatch(/unofficial fan guide/i);
expect(html).toMatch(/official sources/i);
expect(html).not.toMatch(/tier list|best build|all recipes/i);
```

- [ ] **Step 2: Run the test and verify it fails because the component does not exist**

Run:

```bash
pnpm test -- tests/homepage.test.ts
```

Expected: FAIL because the upstream demo homepage lacks the required Delverium identity and guide map.

- [ ] **Step 3: Create the smallest semantic page composition that passes the test**

Create `src/components/DelveriumHomepage.astro` with a `<header>`, `<main>`, semantic sections, and `<footer>`. Render the six exact guide topics as cards. Until their routes are created, render unavailable cards as non-anchor elements carrying `aria-disabled="true"` and visible `Guide in preparation` copy; only the Steam button is an external link. Use a `sourceFacts` array local to the component for “PC on Steam”, “1–8 players”, and “Early Access”, avoiding unsupported gameplay claims.

Replace the body of `src/pages/index.astro` with the established upstream layout wrapper plus `<DelveriumHomepage />`; preserve upstream canonical, Open Graph, sitemap, and JSON-LD conventions. Add component-scoped styles or minimal upstream-token additions for graphite background, parchment surface, copper action color, moss status color, visible `:focus-visible` outlines, and the explicit `@media (max-width: 767px)` one-column card rule.

- [ ] **Step 4: Run the homepage test and accessibility-oriented static checks**

Run:

```bash
pnpm test -- tests/homepage.test.ts
pnpm check
pnpm build
rg -n "<h1\\b|Guide in preparation|unofficial fan guide|official sources" dist/index.html
```

Expected: the test/build pass; one H1 and all required trust language occur in `dist/index.html`.

- [ ] **Step 5: Commit the verified homepage**

Run:

```bash
git add src/components/DelveriumHomepage.astro src/pages/index.astro src/styles tests/homepage.test.ts
git commit -m "feat: add Delverium Guide review homepage"
```

### Task 4: Perform local visual and production-readiness review without publishing

**Files:**
- Modify: only files found to violate the acceptance criteria in this task.
- Test: `tests/seo.test.ts`, `tests/homepage.test.ts`, existing test suite.

**Interfaces:**
- Consumes: the static build from Tasks 2–3.
- Produces: a locally served review URL and screenshots/observations for user approval; no remote deployment artifact.

- [ ] **Step 1: Run the entire automated suite and static content checks**

Run:

```bash
pnpm test
pnpm check
pnpm lint
pnpm check-content
pnpm build
pnpm check-sitemap
```

Expected: all commands exit successfully. If upstream checks fail before a local modification can affect them, report the command and output separately rather than weakening a check.

- [ ] **Step 2: Start a local preview and inspect desktop and mobile widths**

Run:

```bash
pnpm preview --host 127.0.0.1
```

Inspect `/` at 1440px and 390px widths. Verify the hero, guide map, trust strip, policy text, footer disclaimer, focus rings, and single-column mobile card layout. Do not expose the server beyond localhost.

- [ ] **Step 3: Correct only acceptance-criterion failures and re-run the full verification sequence**

Run:

```bash
pnpm test
pnpm check
pnpm lint
pnpm check-content
pnpm build
pnpm check-sitemap
```

Expected: all commands pass after any correction.

- [ ] **Step 4: Commit the final review-ready state and present it locally**

Run:

```bash
git status --short
git add -A
git commit -m "chore: prepare Delverium homepage for review"
```

Expected: a clean working tree after the commit. Share the localhost preview with the user and explicitly state that GitHub, Cloudflare, and domain changes remain pending their visual approval.

## Plan Self-Review

- **Spec coverage:** Task 2 covers domain identity, English SEO, canonicals, JSON-LD inputs, and honest official references. Task 3 covers every homepage section, visual tokens, no-JavaScript semantics, source discipline, responsive behavior, and the single-H1 requirement. Task 4 covers the prescribed local preview and all build checks. Deployment, GitHub, Cloudflare, DNS, database/CMS, invented gameplay material, and bulk content remain excluded.
- **Placeholder scan:** no TODO/TBD, deferred implementation markers, or unspecified test steps are present. “Guide in preparation” is an intentional visible product state, not a planning placeholder.
- **Type consistency:** Task 2 establishes the existing `site` export used by Task 3. Task 3 exports one `DelveriumHomepage` Astro component consumed solely by the root route. Tests observe rendered output rather than internal markup details.
- **Review-focus coverage:** canonical/demo identity is asserted in Task 2; unavailable destinations, H1 count, trust language, and keyword/claim absence are asserted in Task 3; mobile geometry and visual clipping are inspected in Task 4.

