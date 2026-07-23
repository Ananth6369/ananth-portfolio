import { CACHE_TTL_MS } from "@/constants/medium";

export interface ICacheAdapter<T> {
  get(key: string): T | null;
  set(key: string, data: T, ttlMs?: number): void;
  clear(key: string): void;
}

interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

/**
 * In-memory implementation of ICacheAdapter.
 * Easily replaceable with Redis/KV store adapter in future milestones.
 */
class InMemoryCacheAdapter<T> implements ICacheAdapter<T> {
  private cache = new Map<string, CacheItem<T>>();

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: T, ttlMs: number = CACHE_TTL_MS): void {
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { data, expiresAt });
  }

  clear(key: string): void {
    this.cache.delete(key);
  }
}

// Global cache instance (persisted across warm Lambdas / Dev reloads in global scope)
const globalCacheKey = "__PORTFOLIO_BLOG_CACHE__";
const globalObj = globalThis as unknown as Record<string, unknown>;

if (!globalObj[globalCacheKey]) {
  globalObj[globalCacheKey] = new InMemoryCacheAdapter<unknown>();
}

export const blogCache = globalObj[globalCacheKey] as ICacheAdapter<unknown>;

/**
 * Wrapper helper to retrieve cached data by key.
 */
export function getCachedData<T>(key: string): T | null {
  return (blogCache.get(key) as T) || null;
}

/**
 * Wrapper helper to set cached data by key.
 */
export function setCachedData<T>(key: string, data: T, ttlMs: number = CACHE_TTL_MS): void {
  blogCache.set(key, data, ttlMs);
}
