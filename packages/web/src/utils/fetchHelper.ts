// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AsyncCache, Guards, Is, ObjectHelper, StringHelper, type IError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { FetchError } from "../errors/fetchError";
import { HeaderTypes } from "../models/headerTypes";
import { HttpMethod } from "../models/httpMethod";
import { HttpStatusCode } from "../models/httpStatusCode";
import type { IFetchOptions } from "../models/IFetchOptions";
import type { IHttpHeaders } from "../models/IHttpHeaders";
import { MimeTypes } from "../models/mimeTypes";

/**
 * Class to helper with fetch operations.
 */
export class FetchHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<FetchHelper>();

	/**
	 * Prefix to use for cache entries.
	 * @internal
	 */
	private static readonly _CACHE_PREFIX: string = "fetch_";

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME_CAMEL_CASE: string =
		StringHelper.camelCase(nameof<FetchHelper>());

	/**
	 * Perform a fetch request.
	 * @param source The source for the request.
	 * @param url The url for the request.
	 * @param method The http method.
	 * @param body Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetch(
		source: string,
		url: string,
		method: HttpMethod,
		body?: string | Uint8Array,
		options?: Omit<IFetchOptions, "cacheTtlSeconds">
	): Promise<Response> {
		Guards.string(FetchHelper._CLASS_NAME, nameof(source), source);
		Guards.string(FetchHelper._CLASS_NAME, nameof(url), url);
		Guards.arrayOneOf<HttpMethod>(
			FetchHelper._CLASS_NAME,
			nameof(method),
			method,
			Object.values(HttpMethod)
		);
		if (!Is.undefined(body) && !Is.uint8Array(body)) {
			Guards.string(FetchHelper._CLASS_NAME, nameof(body), body);
		}
		if (!Is.undefined(options)) {
			Guards.object<IFetchOptions>(FetchHelper._CLASS_NAME, nameof(options), options);
			if (!Is.undefined(options.headers)) {
				Guards.object<IHttpHeaders>(
					FetchHelper._CLASS_NAME,
					nameof(options.headers),
					options.headers
				);
			}
			if (!Is.undefined(options.timeoutMs)) {
				Guards.integer(FetchHelper._CLASS_NAME, nameof(options.timeoutMs), options.timeoutMs);
			}
			if (!Is.undefined(options.includeCredentials)) {
				Guards.boolean(
					FetchHelper._CLASS_NAME,
					nameof(options.includeCredentials),
					options.includeCredentials
				);
			}
			if (!Is.undefined(options.retryCount)) {
				Guards.integer(FetchHelper._CLASS_NAME, nameof(options.retryCount), options.retryCount);
			}
			if (!Is.undefined(options.retryDelayMs)) {
				Guards.integer(FetchHelper._CLASS_NAME, nameof(options.retryDelayMs), options.retryDelayMs);
			}
		}

		let controller: AbortController | undefined;
		let timerId: number | NodeJS.Timeout | undefined;
		const retryCount = options?.retryCount ?? 1;
		const baseDelayMilliseconds = options?.retryDelayMs ?? 3000;

		let lastError: IError | undefined;
		let attempt;
		for (attempt = 0; attempt < retryCount; attempt++) {
			if (attempt > 0) {
				const exponentialBackoffDelay = baseDelayMilliseconds * Math.pow(2, attempt - 1);
				await new Promise(resolve => globalThis.setTimeout(resolve, exponentialBackoffDelay));
			}

			if (options?.timeoutMs !== undefined) {
				controller = new AbortController();
				timerId = globalThis.setTimeout(() => {
					if (controller) {
						controller.abort();
					}
				}, options?.timeoutMs);
			}

			try {
				const requestOptions: RequestInit = {
					method,
					headers: options?.headers as HeadersInit,
					body: method === HttpMethod.POST || method === HttpMethod.PUT ? body : undefined,
					signal: controller ? controller.signal : undefined
				};
				if (Is.boolean(options?.includeCredentials)) {
					requestOptions.credentials = "include";
				}

				const response = await fetch(url, requestOptions);

				if (!response.ok && retryCount > 1) {
					lastError = new FetchError(
						source,
						`${FetchHelper._CLASS_NAME_CAMEL_CASE}.general`,
						(response.status as HttpStatusCode) ?? HttpStatusCode.internalServerError,
						{
							url,
							statusText: response.statusText
						}
					);
				} else {
					return response;
				}
			} catch (err) {
				const isErr = Is.object<IError>(err);
				if (isErr && Is.stringValue(err.message) && err.message.includes("Failed to fetch")) {
					lastError = new FetchError(
						source,
						`${FetchHelper._CLASS_NAME_CAMEL_CASE}.connectivity`,
						HttpStatusCode.serviceUnavailable,
						{
							url
						}
					);
				} else {
					const isAbort = isErr && err.name === "AbortError";
					const props: { [id: string]: unknown } = { url };
					let httpStatus: HttpStatusCode = HttpStatusCode.internalServerError;
					if (isAbort) {
						httpStatus = HttpStatusCode.requestTimeout;
					} else if (isErr && "httpStatus" in err) {
						httpStatus = err.httpStatus as HttpStatusCode;
					}
					if (isErr && "statusText" in err) {
						props.statusText = err.statusText;
					}
					lastError = new FetchError(
						source,
						`${FetchHelper._CLASS_NAME_CAMEL_CASE}.${isAbort ? "timeout" : "general"}`,
						httpStatus,
						props
					);
				}
			} finally {
				if (timerId) {
					globalThis.clearTimeout(timerId);
				}
			}
		}

		if (retryCount > 1 && attempt === retryCount) {
			// False positive as FetchError is derived from Error
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			throw new FetchError(
				source,
				`${FetchHelper._CLASS_NAME_CAMEL_CASE}.retryLimitExceeded`,
				HttpStatusCode.internalServerError,
				{ url },
				lastError
			);
		}

		throw lastError;
	}

	/**
	 * Perform a request in json format.
	 * @param source The source for the request.
	 * @param url The url for the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetchJson<T, U>(
		source: string,
		url: string,
		method: HttpMethod,
		requestData?: T,
		options?: IFetchOptions
	): Promise<U> {
		if (Is.integer(options?.cacheTtlMs) && options.cacheTtlMs >= 0) {
			// The cache option is set, so call the same method again but without
			// the cache option to get the result and cache it.
			const cacheResponse = AsyncCache.exec(
				`${FetchHelper._CACHE_PREFIX}${url}`,
				options.cacheTtlMs,
				async () =>
					FetchHelper.fetchJson<T, U>(
						source,
						url,
						method,
						requestData,
						ObjectHelper.omit(options, ["cacheTtlMs"])
					)
			);

			// If the return value is a promise return it, otherwise continue
			// with the regular processing.
			if (Is.promise(cacheResponse)) {
				return cacheResponse;
			}
		}

		options ??= {};
		options.headers ??= {};

		if (
			Is.undefined(options.headers[HeaderTypes.ContentType]) &&
			(method === HttpMethod.POST || method === HttpMethod.PUT || method === HttpMethod.PATCH)
		) {
			options.headers[HeaderTypes.ContentType] = MimeTypes.Json;
		}

		const response = await FetchHelper.fetch(
			source,
			url,
			method,
			requestData ? JSON.stringify(requestData) : undefined,
			options
		);

		if (response.ok) {
			if (response.status === HttpStatusCode.noContent) {
				return {} as U;
			}
			try {
				return (await response.json()) as U;
			} catch (err) {
				// False positive as FetchError is derived from Error
				// eslint-disable-next-line @typescript-eslint/only-throw-error
				throw new FetchError(
					source,
					`${FetchHelper._CLASS_NAME_CAMEL_CASE}.decodingJSON`,
					HttpStatusCode.badRequest,
					{ url },
					err
				);
			}
		}

		const errorResponseData = await response.json();

		// False positive as FetchError is derived from Error
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw new FetchError(
			source,
			`${FetchHelper._CLASS_NAME_CAMEL_CASE}.failureStatusText`,
			response.status as HttpStatusCode,
			{
				statusText: response.statusText,
				url
			},
			errorResponseData
		);
	}

	/**
	 * Perform a request for binary data.
	 * @param source The source for the request.
	 * @param url The url for the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetchBinary<T>(
		source: string,
		url: string,
		method: Extract<HttpMethod, "GET" | "POST">,
		requestData?: Uint8Array,
		options?: IFetchOptions
	): Promise<Uint8Array | T> {
		if (Is.integer(options?.cacheTtlMs) && options.cacheTtlMs >= 0) {
			// The cache option is set, so call the same method again but without
			// the cache option to get the result and cache it.
			const cacheResponse = AsyncCache.exec(
				`${FetchHelper._CACHE_PREFIX}${url}`,
				options.cacheTtlMs * 1000,
				async () =>
					FetchHelper.fetchBinary<T>(
						source,
						url,
						method,
						requestData,
						ObjectHelper.omit(options, ["cacheTtlMs"])
					)
			);

			// If the return value is a promise return it, otherwise continue
			// with the regular processing.
			if (Is.promise(cacheResponse)) {
				return cacheResponse;
			}
		}

		options ??= {};
		options.headers ??= {};

		if (Is.undefined(options.headers[HeaderTypes.ContentType])) {
			options.headers[HeaderTypes.ContentType] = MimeTypes.OctetStream;
		}

		const response = await this.fetch(source, url, method, requestData, options);

		if (response.ok) {
			if (method === HttpMethod.GET) {
				if (response.status === HttpStatusCode.noContent) {
					return new Uint8Array();
				}
				return new Uint8Array(await response.arrayBuffer());
			}
			try {
				return (await response.json()) as T;
			} catch (err) {
				// False positive as FetchError is derived from Error
				// eslint-disable-next-line @typescript-eslint/only-throw-error
				throw new FetchError(
					source,
					`${FetchHelper._CLASS_NAME_CAMEL_CASE}.decodingJSON`,
					HttpStatusCode.badRequest,
					{ url },
					err
				);
			}
		}

		const errorResponseData = await response.json();

		// False positive as FetchError is derived from Error
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw new FetchError(
			source,
			`${FetchHelper._CLASS_NAME_CAMEL_CASE}.failureStatusText`,
			response.status as HttpStatusCode,
			{
				statusText: response.statusText,
				url
			},
			errorResponseData
		);
	}

	/**
	 * Clears the cache.
	 */
	public static clearCache(): void {
		AsyncCache.clearCache(FetchHelper._CACHE_PREFIX);
	}

	/**
	 * Get a cache entry.
	 * @param url The url for the request.
	 * @returns The cache entry if it exists.
	 */
	public static async getCacheEntry<T>(url: string): Promise<T | undefined> {
		return AsyncCache.get<T>(`${FetchHelper._CACHE_PREFIX}${url}`);
	}

	/**
	 * Set a cache entry.
	 * @param url The url for the request.
	 * @param value The value to cache.
	 * @returns The cache entry if it exists.
	 */
	public static async setCacheEntry<T>(url: string, value: T): Promise<void> {
		AsyncCache.set<T>(`${FetchHelper._CACHE_PREFIX}${url}`, value);
	}

	/**
	 * Remove a cache entry.
	 * @param url The url for the request.
	 */
	public static removeCacheEntry(url: string): void {
		AsyncCache.remove(`${FetchHelper._CACHE_PREFIX}${url}`);
	}
}
