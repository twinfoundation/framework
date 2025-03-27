// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "./is";

/**
 * Cache the results from asynchronous requests.
 */
export class AsyncCache {
	/**
	 * Cache for the fetch requests.
	 * @internal
	 */
	private static _cache: {
		[url: string]: { response: Promise<unknown>; expires: number };
	} = {};

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

			if (!this._cache[key]) {
				this._cache[key] = {
					response: requestMethod(),
					expires: ttlMs === 0 ? 0 : Date.now() + ttlMs
				};
			}

			return this._cache[key].response as Promise<T>;
		}
	}

	/**
	 * Get an entry from the cache.
	 * @param key The key to get from the cache.
	 * @returns The item from the cache if it exists.
	 */
	public static async get<T = unknown>(key: string): Promise<T | undefined> {
		return AsyncCache._cache[key]?.response as T;
	}

	/**
	 * Set an entry into the cache.
	 * @param key The key to set in the cache.
	 * @param value The value to set in the cache.
	 * @param ttlMs The TTL of the entry in the cache in ms, defaults to 1s.
	 * @returns Nothing.
	 */
	public static async set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void> {
		AsyncCache._cache[key] = {
			response: Promise.resolve(value),
			expires: Date.now() + (ttlMs ?? 1000)
		};
	}

	/**
	 * Remove an entry from the cache.
	 * @param key The key to remove from the cache.
	 */
	public static remove(key: string): void {
		delete AsyncCache._cache[key];
	}

	/**
	 * Clear the cache.
	 * @param prefix Optional prefix to clear only entries with that prefix.
	 */
	public static clearCache(prefix?: string): void {
		if (Is.stringValue(prefix)) {
			for (const entry in this._cache) {
				if (entry.startsWith(prefix)) {
					delete this._cache[entry];
				}
			}
		} else {
			AsyncCache._cache = {};
		}
	}

	/**
	 * Perform a cleanup of the expired entries in the cache.
	 */
	public static cleanupExpired(): void {
		for (const entry in this._cache) {
			if (AsyncCache._cache[entry].expires > 0 && AsyncCache._cache[entry].expires < Date.now()) {
				delete this._cache[entry];
			}
		}
	}
}
