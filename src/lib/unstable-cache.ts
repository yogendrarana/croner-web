import { cache } from 'react';
import { unstable_cache as next_unstable_cache } from 'next/cache';

/**
 * @see https://github.com/ethanniser/NextMaster/blob/main/src/lib/unstable-cache.ts
 */

/**
 * (next_unstable_cache doesn't handle deduplication, so we have to wrap it in React's cache)
 *
 * unstable_cache function wraps Next.js unstable_cache with React cache
 * to add in-flight deduplication on top of persistent caching.
 */

/**
 * @param callback - The function to be cached
 * @param key - The key to be used for caching
 * @param options - The options for caching
 * @param options.revalidate - The revalidation time in seconds
 * @param options.tags - The tags to be used for caching
 * @returns A function that returns a promise with the cached value
 */
export const unstable_cache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  key: string[],
  options?: {
    revalidate?: number | false;
    tags?: string[];
  },
) => cache(next_unstable_cache(callback, key, options));
