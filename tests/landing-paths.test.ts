import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch landing surface', () => {
  test('does not ship AnvilWiki marketing routes', () => {
    expect(existsSync(`${root}/src/pages/landing.astro`)).toBe(false);
    expect(existsSync(`${root}/src/pages/zh/landing.astro`)).toBe(false);
  });
});
