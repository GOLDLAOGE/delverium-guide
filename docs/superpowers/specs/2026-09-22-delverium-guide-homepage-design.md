# Delverium Guide Homepage Design

## Purpose

Create the first reviewable page for **Delverium Guide**, an English-language, search-focused guide site for the Steam Early Access game *Delverium*. The public domain will be `delveriumguide.com`, but this first delivery is a local preview only.

## Confirmed Decisions

- Start from the upstream AnvilWiki project.
- Target language is English.
- Use the static Astro site architecture and retain the upstream content/SEO foundations that remain applicable.
- The first deliverable is one homepage for review. It must not be deployed, connected to Cloudflare, or pointed at the domain yet.
- The site is a curated guide entry point, not an open-edit community wiki or a complete item database.
- Publish only information traceable to official Steam/Sagestone communications, user-provided first-hand evidence, or a cited, checkable source. Do not present AI inference as tested gameplay advice.

## Audience and Positioning

The primary reader is an English-speaking PC player arriving from search before or shortly after starting Delverium. They need an immediate, trustworthy route to beginner, co-op, crafting, farming, building, dungeon, and update information.

The page must compete through clarity and source discipline, not by claiming unverified build advice or by attempting to duplicate established community-wiki databases.

## Keyword and Content Strategy

The homepage's principal query is `Delverium guide`. Supporting intent groups are:

- `Delverium beginner guide` / `getting started`
- `Delverium co-op` / `multiplayer` / `split screen`
- `Delverium crafting`, `farming`, and `building`
- `Delverium dungeons`
- `Delverium updates` / `Early Access`

Use the principal phrase naturally in the title, H1, introductory copy, and internal link anchors. Supporting phrases belong to descriptive section headings and destination-card copy. Do not manufacture gameplay facts, make ranking claims, or repeat terms solely to increase density.

Initial source of truth for game facts:

- The official Steam product page for release status, supported languages, and player modes.
- Official Steam announcements from Sagestone Games for release, patch, and feature statements.

Every future gameplay guide must record an updated date and cite its supporting source(s). The first homepage must use only facts present in those sources.

## Information Architecture

The home route (`/`) contains, in order:

1. **Utility navigation** — wordmark, compact guide navigation, and a visible “Official sources” destination.
2. **Hero** — the H1 “Delverium Guide”, a factual description of the game's exploration, farming, crafting, settlement building, and dungeon loops, one primary route to the guide hub, and one secondary official-Steam route.
3. **Guide map** — six non-invented topical cards: Getting Started, Co-op, Crafting, Farming & Building, Dungeons, and Updates. Until content exists, cards direct to appropriately named landing routes or display a clear “guide in preparation” state; they must not link to false articles.
4. **Trust strip** — compact, source-grounded facts: PC on Steam, one to eight players, Early Access, and source-verified editorial policy.
5. **Editorial promise** — a short explanation that the site distinguishes confirmed information from guides awaiting first-hand verification.
6. **Footer** — unofficial-fan-site disclaimer, copyright/attribution treatment from upstream project, source link, and domain identity.

The page must retain a single H1 and a semantic heading hierarchy. Navigation, cards, and calls to action must still make sense in a no-JavaScript browser.

## Visual Direction

**Design read:** Editorial game-guide landing page for PC survival-sandbox players, using a grounded subterranean-adventure aesthetic rather than a generic SaaS or fantasy-template UI.

Use a near-black graphite background, warm parchment copy surfaces, oxidized copper accents, and restrained moss-green status details. Typography should feel editorial and legible, with a strong display face only for the title. Do not use purple AI gradients, glassmorphism, excessive badges, fake UI dashboards, or decorative animation that obscures reading.

Use the upstream responsive layout system where appropriate, but establish site-specific design tokens for color, borders, surfaces, focus states, and spacing. The hero may use an approved game screenshot or an abstract CSS texture only when it does not create an unsupported factual implication. No scraped artwork or unrelated AI-generated game imagery.

Desktop guide cards form a varied, readable grid; at less than 768px, all multi-column sections collapse into a single accessible column with touch-safe links.

## SEO and Technical Requirements

- Configure canonical site identity for `https://delveriumguide.com` while preview remains local.
- Provide an English title and description centered on the principal query without claiming an official relationship.
- Emit `WebSite` and `Organization`/`WebPage` structured data only where upstream conventions support it; use the accurate `unofficial fan guide` context in visible copy.
- Preserve sitemap, robots, Open Graph, and JSON-LD functionality already supplied by AnvilWiki, changing only site-specific values.
- Keep the page statically generated and avoid new runtime dependencies.
- Use local assets or remote assets already licensed/authorized for use; do not add Google Fonts or external embeds.
- Keep Lighthouse-friendly, JavaScript-minimal behavior.

## Non-goals for This Delivery

- No public deployment, GitHub repository creation, Cloudflare account action, DNS change, or domain connection.
- No new database, CMS, user account system, comments, or community editing.
- No invented how-to articles, recipe tables, tier lists, build advice, or gameplay statistics.
- No bulk AI article generation.
- No claim that Delverium Guide is official or affiliated with Sagestone Games.

## Acceptance Criteria

- A local Astro build renders a responsive English homepage at `/`.
- The page’s title/H1/intro use `Delverium guide` naturally and route visitors toward the six verified topic areas.
- All visible game facts are traceable to the sources above, and the page states that it is an unofficial fan guide.
- Navigation and cards contain no dead or misleading links.
- The page works without client-side JavaScript, with accessible keyboard focus and a single-column mobile layout.
- The project’s content/build checks pass, and a desktop and mobile local preview are ready for user review.
