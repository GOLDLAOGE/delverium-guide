import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch homepage entry point', () => {
  test('uses the dedicated Delverium homepage instead of the template home UI', () => {
    const source = readFileSync(`${root}/src/pages/index.astro`, 'utf8');
    expect(source).toContain("DelveriumHomepage");
    expect(source).not.toContain("HomePage");
  });
});
