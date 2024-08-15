// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is, StringHelper, type IError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { FetchError } from "../errors/fetchError";
import { HttpMethod } from "../models/httpMethod";
import { HttpStatusCode } from "../models/httpStatusCode";
import type { IFetchOptions } from "../models/IFetchOptions";
import type { IHttpHeaders } from "../models/IHttpHeaders";

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
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME_CAMEL_CASE: string =
		StringHelper.camelCase(nameof<FetchHelper>());

	/**
	 * Perform a fetch request.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param path The path of the request.
	 * @param method The http method.
	 * @param body Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetch(
		source: string,
		endpoint: string,
		path: string,
		method: HttpMethod,
		body?: string | Uint8Array,
		options?: IFetchOptions
	): Promise<Response> {
		Guards.string(FetchHelper._CLASS_NAME, nameof(source), source);
		Guards.string(FetchHelper._CLASS_NAME, nameof(endpoint), endpoint);
		Guards.string(FetchHelper._CLASS_NAME, nameof(path), path);
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
					body: method === "POST" || method === "PUT" ? body : undefined,
					signal: controller ? controller.signal : undefined
				};
				if (Is.boolean(options?.includeCredentials)) {
					requestOptions.credentials = "include";
				}

				const response = await fetch(`${endpoint}${path}`, requestOptions);

				if (!response.ok && retryCount > 1) {
					lastError = new FetchError(
						source,
						`${FetchHelper._CLASS_NAME_CAMEL_CASE}.general`,
						(response.status as HttpStatusCode) ?? HttpStatusCode.internalServerError,
						{
							path,
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
							path
						}
					);
				} else {
					const isAbort = isErr && err.name === "AbortError";
					const props: { [id: string]: unknown } = { path };
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
				{ path },
				lastError
			);
		}

		throw lastError;
	}

	/**
	 * Perform a request in json format.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param path The path of the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetchJson<T, U>(
		source: string,
		endpoint: string,
		path: string,
		method: HttpMethod,
		requestData?: T,
		options?: IFetchOptions
	): Promise<U> {
		options ??= {};
		options.headers ??= {};
		options.headers.Accept = "application/json, application/ld+json";

		const response = await FetchHelper.fetch(
			source,
			endpoint,
			path,
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
					{ path },
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
				path
			},
			errorResponseData
		);
	}

	/**
	 * Perform a request for binary data.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param path The path of the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @returns The response.
	 */
	public static async fetchBinary<T>(
		source: string,
		endpoint: string,
		path: string,
		method: Extract<HttpMethod, "GET" | "POST">,
		requestData?: Uint8Array,
		options?: IFetchOptions
	): Promise<Uint8Array | T> {
		options ??= {};
		options.headers ??= {};
		options.headers["Content-Type"] = "application/octet-stream";

		const response = await this.fetch(source, endpoint, path, method, requestData, options);

		if (response.ok) {
			if (method === "GET") {
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
					{ path },
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
				path
			},
			errorResponseData
		);
	}
}
