// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "./is";
import { SharedStore } from "./sharedStore";

/**
 * Cache the results from asynchronous requests.
 */
export class AsyncCache {
	/**
	 * Execute an async request and cache the result.
	 * @param key The key for the entry in the cache.
	 * @param ttlMs The TTL of the entry in the cache.
	 * @param requestMethod The method to call if not cached.
	 * @returns The response.
	 */
	public static exec<T = unknown>(
		key: string,
		ttlMs: number | undefined,
		requestMethod: () => Promise<T>
	): Promise<T> | undefined {
		const cacheEnabled = Is.integer(ttlMs) && ttlMs >= 0;
		if (cacheEnabled) {
			AsyncCache.cleanupExpired();

			const cache = AsyncCache.getSharedCache();

			if (!cache[key]) {
				cache[key] = {
					response: requestMethod(),
					expires: ttlMs === 0 ? 0 : Date.now() + ttlMs
				};
			}

			return cache[key].response as Promise<T>;
		}
	}

	/**
	 * Get an entry from the cache.
	 * @param key The key to get from the cache.
	 * @returns The item from the cache if it exists.
	 */
	public static async get<T = unknown>(key: string): Promise<T | undefined> {
		const cache = AsyncCache.getSharedCache();
		return cache[key]?.response as T;
	}

	/**
	 * Set an entry into the cache.
	 * @param key The key to set in the cache.
	 * @param value The value to set in the cache.
	 * @param ttlMs The TTL of the entry in the cache in ms, defaults to 1s.
	 * @returns Nothing.
	 */
	public static async set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void> {
		const cache = AsyncCache.getSharedCache();
		cache[key] = {
			response: Promise.resolve(value),
			expires: Date.now() + (ttlMs ?? 1000)
		};
	}

	/**
	 * Remove an entry from the cache.
	 * @param key The key to remove from the cache.
	 */
	public static remove(key: string): void {
		const cache = AsyncCache.getSharedCache();
		delete cache[key];
	}

	/**
	 * Clear the cache.
	 * @param prefix Optional prefix to clear only entries with that prefix.
	 */
	public static clearCache(prefix?: string): void {
		const cache = AsyncCache.getSharedCache();
		if (Is.stringValue(prefix)) {
			for (const entry in cache) {
				if (entry.startsWith(prefix)) {
					delete cache[entry];
				}
			}
		} else {
			SharedStore.set("asyncCache", {});
		}
	}

	/**
	 * Perform a cleanup of the expired entries in the cache.
	 */
	public static cleanupExpired(): void {
		const cache = AsyncCache.getSharedCache();
		for (const entry in cache) {
			if (cache[entry].expires > 0 && cache[entry].expires < Date.now()) {
				delete cache[entry];
			}
		}
	}

	/**
	 * Get the shared cache.
	 * @returns The shared cache.
	 * @internal
	 */
	private static getSharedCache(): {
		[url: string]: { response: Promise<unknown>; expires: number };
	} {
		let sharedCache = SharedStore.get<{
			[url: string]: { response: Promise<unknown>; expires: number };
		}>("asyncCache");

		if (Is.undefined(sharedCache)) {
			sharedCache = {};
			SharedStore.set("asyncCache", sharedCache);
		}

		return sharedCache;
	}
}
