import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch locale surface', () => {
  test('ships only the English Delverium entry point for this first release', () => {
    expect(existsSync(`${root}/src/pages/[locale]`)).toBe(false);
    expect(existsSync(`${root}/src/pages/index.astro`)).toBe(true);
  });
});
