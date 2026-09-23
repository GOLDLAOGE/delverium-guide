import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch content surface', () => {
  test('does not ship the template game code pages', () => {
    expect(existsSync(`${root}/src/content/wiki/en/codes/all-codes.mdx`)).toBe(false);
    expect(existsSync(`${root}/src/content/wiki/ja/codes/all-codes.mdx`)).toBe(false);
  });
});
