import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes and drops conflicts', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('filters falsy values', () => {
    expect(cn('base', false && 'hidden', undefined, 'end')).toBe('base end');
  });
});
