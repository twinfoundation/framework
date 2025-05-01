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
	 * @param cacheFailures Cache failure results, defaults to false.
	 * @returns The response.
	 */
	public static exec<T = unknown>(
		key: string,
		ttlMs: number | undefined,
		requestMethod: () => Promise<T>,
		cacheFailures?: boolean
	): Promise<T> | undefined {
		const cacheEnabled = Is.integer(ttlMs) && ttlMs >= 0;
		if (cacheEnabled) {
			AsyncCache.cleanupExpired();

			const cache = AsyncCache.getSharedCache<T>();

			// Do we have a cache entry for the key
			if (cache[key]) {
				if (!Is.empty(cache[key].result)) {
					// If the cache has already resulted in a value, resolve it
					return Promise.resolve(cache[key].result);
				} else if (!Is.empty(cache[key].error)) {
					// If the cache has already resulted in an error, reject it
					return Promise.reject(cache[key].error);
				}

				// Otherwise create a promise to return and store the resolver
				// and rejector in the cache entry, so that we can call then
				// when the request is done

				let storedResolve: ((value: T | PromiseLike<T>) => void) | undefined;
				let storedReject: ((reason?: unknown) => void) | undefined;
				const wait = new Promise<T>((resolve, reject) => {
					storedResolve = resolve;
					storedReject = reject;
				});
				if (!Is.empty(storedResolve) && !Is.empty(storedReject)) {
					cache[key].promiseQueue.push({
						requestMethod,
						resolve: storedResolve,
						reject: storedReject
					});
				}
				return wait;
			}

			// If we don't have a cache entry, create a new one
			cache[key] = {
				promiseQueue: [],
				expires: ttlMs === 0 ? 0 : Date.now() + ttlMs
			};

			// Return a promise that wraps the original request method
			// so that we can store any results or errors in the cache
			return new Promise((resolve, reject) => {
				// Call the request method and store the result
				requestMethod()
					// eslint-disable-next-line promise/prefer-await-to-then
					.then(res => {
						// If the request was successful, store the result
						cache[key].result = res;

						// and resolve both this promise and all the waiters
						resolve(res);
						for (const wait of cache[key].promiseQueue) {
							wait.resolve(res);
						}
						return res;
					})
					// eslint-disable-next-line promise/prefer-await-to-then
					.catch((err: Error) => {
						// Reject the promise
						reject(err);

						// Handle the waiters based on the cacheFailures flag
						if (cacheFailures ?? false) {
							// If we are caching failures, store the error and reject the waiters
							cache[key].error = err;
							for (const wait of cache[key].promiseQueue) {
								wait.reject(err);
							}
							// Clear the waiters so we don't call them again
							cache[key].promiseQueue = [];
						} else {
							// If not caching failures for any queued requests we
							// have no value to either resolve or reject, so we
							// just resolve with the original request method
							for (const wait of cache[key].promiseQueue) {
								wait.resolve(wait.requestMethod());
							}
							delete cache[key];
						}
					});
			});
		}
	}

	/**
	 * Get an entry from the cache.
	 * @param key The key to get from the cache.
	 * @returns The item from the cache if it exists.
	 */
	public static async get<T = unknown>(key: string): Promise<T | undefined> {
		const cache = AsyncCache.getSharedCache<T>();
		if (!Is.empty(cache[key].result)) {
			// If the cache has already resulted in a value, resolve it
			return cache[key].result;
		} else if (!Is.empty(cache[key].error)) {
			// If the cache has already resulted in an error, reject it
			throw cache[key].error;
		}
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
			result: value,
			promiseQueue: [],
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
	private static getSharedCache<T = unknown>(): {
		[url: string]: {
			result?: T;
			error?: Error;
			promiseQueue: {
				requestMethod: () => Promise<T>;
				resolve: (value: T | PromiseLike<T>) => void;
				reject: (reason?: unknown) => void;
			}[];
			expires: number;
		};
	} {
		let sharedCache = SharedStore.get<{
			[url: string]: {
				result?: T;
				error?: Error;
				promiseQueue: {
					requestMethod: () => Promise<T>;
					resolve: (value: T | PromiseLike<T>) => void;
					reject: (reason?: unknown) => void;
				}[];
				expires: number;
			};
		}>("asyncCache");

		if (Is.undefined(sharedCache)) {
			sharedCache = {};
			SharedStore.set("asyncCache", sharedCache);
		}

		return sharedCache;
	}
}
