import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('Delverium Guide homepage', () => {
  it('renders a source-disciplined guide map', () => {
    execFileSync('pnpm', ['exec', 'astro', 'build'], { cwd: root, stdio: 'pipe' });
    const html = readFileSync(`${root}/dist/index.html`, 'utf8');
    expect(html).toMatch(/<h1[^>]*>\s*Delverium Guide\s*<\/h1>/i);
    expect((html.match(/<h1\b/gi) ?? []).length).toBe(1);
    for (const topic of ['Getting Started', 'Co-op', 'Crafting', 'Dungeons', 'Updates']) {
      expect(html).toContain(topic);
    }
    expect(html).toMatch(/Farming &amp; Building/);
    expect(html).toMatch(/unofficial fan guide/i);
    expect(html).toMatch(/official sources/i);
    expect(html).toContain('https://store.steampowered.com/app/2710040/Delverium/');
    expect((html.match(/shared\.cdn\.queniuqe\.com\/store_item_assets\/steam\/apps\/2710040/g) ?? []).length).toBe(3);
    for (const label of ['Homestead', 'Exploration', 'Dungeons']) {
      expect(html).toMatch(new RegExp(`Official Steam screenshot: ${label}`));
    }
    for (const section of ['About Delverium', 'Start here', 'Frequently asked questions']) {
      expect(html).toContain(section);
    }
    expect(html).toContain('Official update history');
    expect(html).toContain('Sep 21, 2026');
    expect(html).not.toMatch(/tier list|best build|all recipes/i);
  });
});
