import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('Delverium launch surface', () => {
  it('publishes the Delverium homepage without AnvilWiki demo routes', () => {
    for (const legacyPath of [
      'src/pages/[...slug].astro',
      'src/pages/[locale]/[...slug].astro',
      'src/pages/landing.astro',
      'src/pages/zh/landing.astro',
      'public/_redirects',
      'public/google8362d9398114b66b.html',
    ]) {
      expect(existsSync(`${root}/${legacyPath}`)).toBe(false);
    }

    const manifest = JSON.parse(readFileSync(`${root}/public/manifest.json`, 'utf8')) as {
      name: string;
      short_name: string;
      description: string;
    };
    expect(manifest).toMatchObject({
      name: 'Delverium Guide',
      short_name: 'Delverium',
    });
    expect(manifest.description).toMatch(/Delverium/i);
    expect(manifest.description).not.toMatch(/Anvil Quest/i);

    const homepage = readFileSync(`${root}/src/components/DelveriumHomepage.astro`, 'utf8');
    expect(homepage).toContain('image={officialScenes[2].src}');
    expect(homepage).not.toContain('/images/hero.webp');
  });
});
