import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

describe('launch redirects', () => {
  test('does not publish AnvilWiki handbook redirects', () => {
    expect(existsSync(`${root}/public/_redirects`)).toBe(false);
  });
});
