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
    expect(html).not.toMatch(/tier list|best build|all recipes/i);
  });
});
