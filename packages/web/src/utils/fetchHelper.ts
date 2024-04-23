// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IError } from "@gtsc/core";
import { FetchError } from "../errors/fetchError";
import type { HttpRestVerbs } from "../models/httpRestVerbs";
import { HttpStatusCodes } from "../models/httpStatusCodes";
import type { IHttpRequestHeaders } from "../models/IHttpRequestHeaders";

/**
 * Class to helper with fetch operations.
 */
export class FetchHelper {
	/**
	 * Perform a request in json format.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param route The route of the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @param options.timeout Timeout for requests.
	 * @param options.includeCredentials Include credentials in the requests.
	 * @param options.extraHeaders Include those extra headers.
	 * @param options.maxRetries The number of times to retry fetching defaults to no retries.
	 * @param options.baseDelayMilliseconds The number of milliseconds we should delay any retry with.
	 * @returns The response.
	 */
	public static async fetchJson<T, U>(
		source: string,
		endpoint: string,
		route: string,
		method: HttpRestVerbs,
		requestData?: T,
		options?: {
			extraHeaders?: IHttpRequestHeaders;
			timeout?: number;
			includeCredentials?: boolean;
			maxRetries?: number;
			baseDelayMilliseconds?: number;
		}
	): Promise<U> {
		const response = await FetchHelper.fetchWithTimeout(
			source,
			endpoint,
			route,
			method,
			{
				...options?.extraHeaders,
				Accept: "application/json, application/ld+json"
			},
			requestData ? JSON.stringify(requestData) : undefined,
			options
		);

		if (response.ok) {
			if (response.status === HttpStatusCodes.NO_CONTENT) {
				return {} as U;
			}
			try {
				return (await response.json()) as U;
			} catch (err) {
				// False positive as FetchError is derived from Error
				// eslint-disable-next-line @typescript-eslint/only-throw-error
				throw new FetchError(source, "fetchHelper.decodingJSON", response.status, { route }, err);
			}
		}

		const errorResponseData = await response.json();

		// False positive as FetchError is derived from Error
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw new FetchError(
			source,
			"fetchHelper.failureStatusText",
			response.status,
			{
				statusText: response.statusText,
				route
			},
			errorResponseData
		);
	}

	/**
	 * Perform a request for binary data.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param route The route of the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @param options.timeout Timeout for requests.
	 * @param options.includeCredentials Include credentials in the requests.
	 * @param options.extraHeaders Include those extra headers.
	 * @param options.maxRetries The number of times to retry fetching defaults to no retries.
	 * @param options.baseDelayMilliseconds The number of milliseconds we should delay any retry with.
	 * @returns The response.
	 */
	public static async fetchBinary<T>(
		source: string,
		endpoint: string,
		route: string,
		method: Extract<HttpRestVerbs, "get" | "post">,
		requestData?: Uint8Array,
		options?: {
			extraHeaders?: IHttpRequestHeaders;
			timeout?: number;
			includeCredentials?: boolean;
			maxRetries?: number;
			baseDelayMilliseconds?: number;
		}
	): Promise<Uint8Array | T> {
		const response = await this.fetchWithTimeout(
			source,
			endpoint,
			route,
			method,
			{ "Content-Type": "application/octet-stream" },
			requestData,
			options
		);

		if (response.ok) {
			if (method === "get") {
				return new Uint8Array(await response.arrayBuffer());
			}
			try {
				const responseData = await response.json();

				return responseData as T;
			} catch (err) {
				// False positive as FetchError is derived from Error
				// eslint-disable-next-line @typescript-eslint/only-throw-error
				throw new FetchError(source, "fetchHelper.decodingJSON", response.status, { route }, err);
			}
		}

		const errorResponseData = await response.json();

		// False positive as FetchError is derived from Error
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw new FetchError(
			source,
			"fetchHelper.failureStatusText",
			response.status,
			{
				statusText: response.statusText,
				route
			},
			errorResponseData
		);
	}

	/**
	 * Perform a fetch request.
	 * @param source The source for the request.
	 * @param endpoint The base endpoint for the request.
	 * @param route The route of the request.
	 * @param method The http method.
	 * @param headers The headers for the request.
	 * @param body Request to send to the endpoint.
	 * @param options Options for sending the requests.
	 * @param options.timeout Timeout for requests.
	 * @param options.includeCredentials Include credentials in the requests.
	 * @param options.extraHeaders Include those extra headers.
	 * @param options.maxRetries The number of times to retry fetching defaults to no retries.
	 * @param options.baseDelayMilliseconds The number of milliseconds we should delay any retry with.
	 * @returns The response.
	 */
	public static async fetchWithTimeout(
		source: string,
		endpoint: string,
		route: string,
		method: HttpRestVerbs,
		headers?: IHttpRequestHeaders,
		body?: string | Uint8Array,
		options?: {
			extraHeaders?: IHttpRequestHeaders;
			timeout?: number;
			includeCredentials?: boolean;
			maxRetries?: number;
			baseDelayMilliseconds?: number;
		}
	): Promise<Response> {
		let controller: AbortController | undefined;
		let timerId: number | undefined;
		const maxRetries = options?.maxRetries ?? 1;
		const baseDelayMilliseconds = options?.baseDelayMilliseconds ?? 3000;

		let lastError: IError | undefined;
		let attempt;
		for (attempt = 0; attempt < maxRetries; attempt++) {
			if (attempt > 0) {
				const exponentialBackoffDelay = baseDelayMilliseconds * Math.pow(2, attempt - 1);
				await new Promise(resolve => setTimeout(resolve, exponentialBackoffDelay));
			}

			if (options?.timeout !== undefined) {
				controller = new AbortController();
				timerId = globalThis.setTimeout(() => {
					if (controller) {
						controller.abort();
					}
				}, options?.timeout);
			}

			try {
				const requestOptions: RequestInit = {
					method,
					headers: headers as HeadersInit,
					body: method === "post" || method === "put" ? body : undefined,
					signal: controller ? controller.signal : undefined
				};
				if (Is.boolean(options?.includeCredentials)) {
					requestOptions.credentials = "include";
				}

				const response = await fetch(`${endpoint}${route}`, requestOptions);

				return response;
			} catch (err) {
				if (
					Is.object<IError>(err) &&
					Is.stringValue(err.message) &&
					err.message.includes("Failed to fetch")
				) {
					lastError = new FetchError(
						source,
						"fetchHelper.connectivity",
						HttpStatusCodes.SERVICE_UNAVAILABLE,
						{
							route
						}
					);
				} else {
					lastError = new FetchError(
						source,
						`fetchHelper.${Is.object<IError>(err) && err.name === "AbortError" ? "timeout" : "general"}`,
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						{ route }
					);
				}
			} finally {
				if (timerId) {
					clearTimeout(timerId);
				}
			}
		}

		if (attempt === maxRetries) {
			// False positive as FetchError is derived from Error
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			throw new FetchError(
				source,
				"fetchHelper.retryLimitExceeded",
				HttpStatusCodes.INTERNAL_SERVER_ERROR,
				{ route },
				lastError
			);
		}

		throw lastError;
	}
}
