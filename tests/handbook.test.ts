import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch handbook surface', () => {
  test('does not expose AnvilWiki handbook pages from the Delverium domain', () => {
    expect(existsSync(`${root}/src/pages/landing/docs/index.astro`)).toBe(false);
    expect(existsSync(`${root}/src/pages/zh/landing/docs/index.astro`)).toBe(false);
  });
});
