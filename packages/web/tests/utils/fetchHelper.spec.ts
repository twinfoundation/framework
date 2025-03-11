// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethod } from "../../src/models/httpMethod";
import { HttpStatusCode } from "../../src/models/httpStatusCode";
import type { IFetchOptions } from "../../src/models/IFetchOptions";
import type { IHttpHeaders } from "../../src/models/IHttpHeaders";
import { FetchHelper } from "../../src/utils/fetchHelper";

const fetchMock = vi.fn();

describe("FetchHelper", () => {
	beforeEach(() => {
		globalThis.fetch = fetchMock;
		FetchHelper.clearCache();
	});

	afterEach(() => {
		fetchMock.mockReset();
	});

	test("can fail to get a response from a fetch with no source", async () => {
		await expect(
			FetchHelper.fetch(undefined as unknown as string, "url", "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "source",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no url", async () => {
		await expect(
			FetchHelper.fetch("source", undefined as unknown as string, "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "url",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no method", async () => {
		await expect(
			FetchHelper.fetch("source", "url", undefined as unknown as HttpMethod)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.arrayOneOf",
			properties: {
				property: "method",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with invalid body", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "POST", 1 as unknown as string)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "body",
				value: 1
			}
		});
	});

	test("can fail to get a response from a fetch with invalid options", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, "" as unknown as IFetchOptions)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.object",
			properties: {
				property: "options",
				value: ""
			}
		});
	});

	test("can fail to get a response from a fetch with invalid option headers", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				headers: ""
			} as unknown as IHttpHeaders)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.object",
			properties: {
				property: "options.headers",
				value: ""
			}
		});
	});

	test("can fail to get a response from a fetch with invalid option timeout", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				timeoutMs: ""
			} as unknown as IHttpHeaders)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.integer",
			properties: {
				property: "options.timeoutMs",
				value: ""
			}
		});
	});

	test("can fail to get a response from a fetch with invalid option include credentials", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				includeCredentials: ""
			} as unknown as IHttpHeaders)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.boolean",
			properties: {
				property: "options.includeCredentials",
				value: ""
			}
		});
	});

	test("can fail to get a response from a fetch with invalid option retry count", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				retryCount: ""
			} as unknown as IHttpHeaders)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.integer",
			properties: {
				property: "options.retryCount",
				value: ""
			}
		});
	});

	test("can fail to get a response from a fetch with invalid option retry delay ms", async () => {
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				retryDelayMs: ""
			} as unknown as IHttpHeaders)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.integer",
			properties: {
				property: "options.retryDelayMs",
				value: ""
			}
		});
	});

	test("can fail to get a response with a timeout", async () => {
		fetchMock.mockImplementation(async (endpointPath, options: RequestInit) => {
			if (options.signal) {
				while (!options.signal.aborted) {
					await new Promise(resolve => globalThis.setTimeout(resolve, 100));
				}
				// eslint-disable-next-line no-restricted-syntax
				const abortError = new Error("abort");
				abortError.name = "AbortError";
				throw abortError;
			}
			return new Promise(resolve => globalThis.setTimeout(resolve, 5000));
		});
		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, { timeoutMs: 1 })
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.timeout",
			properties: {
				httpStatus: HttpStatusCode.requestTimeout,
				url: "url"
			}
		});
	});

	test("can fail to get a response from a fetch", async () => {
		fetchMock.mockRejectedValue({
			ok: false
		});
		await expect(FetchHelper.fetch("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.general",
			properties: {
				httpStatus: HttpStatusCode.internalServerError,
				url: "url"
			}
		});
	});

	test("can get a response from a fetch and includeCredentials", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetch("source", "url", "GET", undefined, {
			includeCredentials: true
		});
		const json = await response.json();
		expect(json.foo).toEqual("bar");
	});

	test("can get a response from a fetch", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetch("source", "url", "GET");
		const json = await response.json();
		expect(json.foo).toEqual("bar");
	});

	test("can fail to get a response from a fetchJson when JSON is invalid", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.ok,
			json: async () => new Promise(resolve => resolve(JSON.parse("!")))
		});
		await expect(FetchHelper.fetchJson("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.decodingJSON",
			properties: {
				httpStatus: HttpStatusCode.badRequest,
				url: "url"
			}
		});
	});

	test("can fail to get a response from a fetchwith failed connectivity", async () => {
		// eslint-disable-next-line no-restricted-syntax
		fetchMock.mockRejectedValue(new Error("Failed to fetch"));
		await expect(FetchHelper.fetch("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCode.serviceUnavailable,
				url: "url"
			}
		});
	});

	test("can fail to get a response with a custom status code", async () => {
		fetchMock.mockRejectedValue({ httpStatus: HttpStatusCode.badGateway });
		await expect(FetchHelper.fetch("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCode.badGateway,
				url: "url"
			}
		});
	});

	test("can fail to get a response with a custom status text", async () => {
		fetchMock.mockRejectedValue({ statusText: "foo" });
		await expect(FetchHelper.fetch("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCode.internalServerError,
				url: "url"
			}
		});
	});

	test("can fail to get a response from a fetchJson when response is not ok", async () => {
		fetchMock.mockResolvedValue({
			ok: false,
			status: HttpStatusCode.unauthorized,
			statusText: "Unauthorized",
			json: async () => new Promise(resolve => resolve("Unauthorized"))
		});
		await expect(FetchHelper.fetchJson("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCode.unauthorized,
				url: "url"
			}
		});
	});

	test("can get a response from a fetchJson with POST and payload", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.noContent
		});

		const response = await FetchHelper.fetchJson<{ foo: string }, { foo: string }>(
			"source",
			"url",
			"POST",
			{ foo: "bar" }
		);
		expect(response).toEqual({});
	});

	test("can get an empty response from a fetchJson", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.noContent
		});

		const response = await FetchHelper.fetchJson<never, { foo: string }>("source", "url", "GET");
		expect(response).toEqual({});
	});

	test("can get a response from a fetchJson", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.ok,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetchJson<never, { foo: string }>("source", "url", "GET");
		expect(response.foo).toEqual("bar");
	});

	test("can fail to get a response from a fetchJson with retries with status", async () => {
		fetchMock
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCode.unauthorized,
				statusText: "Unauthorized1"
			})
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCode.unauthorized,
				statusText: "Unauthorized2"
			})
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCode.unauthorized,
				statusText: "Unauthorized3"
			});

		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				retryCount: 2,
				retryDelayMs: 100
			})
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.retryLimitExceeded",
			source: "source",
			properties: {
				httpStatus: HttpStatusCode.internalServerError,
				url: "url"
			},
			inner: {
				name: "FetchError",
				source: "source",
				message: "fetchHelper.general",
				properties: {
					httpStatus: HttpStatusCode.unauthorized,
					url: "url",
					statusText: "Unauthorized2"
				}
			}
		});
	});

	test("can fail to get a response from a fetchJson with retries without status", async () => {
		fetchMock
			.mockResolvedValueOnce({
				ok: false,
				statusText: "Unauthorized1"
			})
			.mockResolvedValueOnce({
				ok: false,
				statusText: "Unauthorized2"
			})
			.mockResolvedValueOnce({
				ok: false,
				statusText: "Unauthorized3"
			});

		await expect(
			FetchHelper.fetch("source", "url", "GET", undefined, {
				retryCount: 2,
				retryDelayMs: 100
			})
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.retryLimitExceeded",
			source: "source",
			properties: {
				httpStatus: HttpStatusCode.internalServerError,
				url: "url"
			},
			inner: {
				name: "FetchError",
				source: "source",
				message: "fetchHelper.general",
				properties: {
					httpStatus: HttpStatusCode.internalServerError,
					url: "url",
					statusText: "Unauthorized2"
				}
			}
		});
	});

	test("can fail to get a response from a fetchJson with json response object", async () => {
		fetchMock.mockImplementation(() => ({
			ok: false,
			status: HttpStatusCode.ok,
			statusText: "Custom",
			json: async (): Promise<{ foo: string }> => new Promise(resolve => resolve({ foo: "bar" }))
		}));

		await expect(FetchHelper.fetchJson("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			source: "source",
			message: "fetchHelper.failureStatusText",
			properties: {
				httpStatus: HttpStatusCode.ok,
				url: "url",
				statusText: "Custom"
			}
		});
	});

	test("can fail to post a response from a fetchBinary when JSON is invalid", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.ok,
			json: async () => new Promise(resolve => resolve(JSON.parse("!")))
		});
		await expect(FetchHelper.fetchBinary("source", "url", "POST")).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.decodingJSON",
			properties: {
				httpStatus: HttpStatusCode.badRequest,
				url: "url"
			}
		});
	});

	test("can fail to get a response from a fetchBinary when response is not ok", async () => {
		fetchMock.mockResolvedValue({
			ok: false,
			status: HttpStatusCode.unauthorized,
			statusText: "Unauthorized",
			json: async () => new Promise(resolve => resolve("Unauthorized"))
		});
		await expect(FetchHelper.fetchBinary("source", "url", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCode.unauthorized,
				url: "url"
			}
		});
	});

	test("can get an empty response from a fetchBinary with JSON request payload", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.noContent,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetchBinary<{ foo: string }>("source", "url", "POST");
		expect(response).toBeDefined();
	});

	test("can get an empty response from a fetchBinary", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.noContent
		});

		const response: Uint8Array = await FetchHelper.fetchBinary("source", "url", "GET");
		expect(response.length).toEqual(0);
	});

	test("can get a response from a fetchBinary", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCode.ok,
			arrayBuffer: async () => new Promise(resolve => resolve(new Uint8Array([1, 2, 3])))
		});

		const response: Uint8Array = await FetchHelper.fetchBinary("source", "url", "GET");
		expect(response[0]).toEqual(1);
		expect(response[1]).toEqual(2);
		expect(response[2]).toEqual(3);
	});

	test("can cache a response from a fetch", async () => {
		let counter = 0;
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: counter++ }))
		});

		const response = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 100
			}
		);
		expect(response.foo).toEqual(0);

		const response2 = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 1
			}
		);
		expect(response2.foo).toEqual(0);

		// Let the cache expire and the next request should get a new value
		await new Promise<void>(resolve => setTimeout(resolve, 200));

		const response3 = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 1
			}
		);
		expect(response3.foo).toEqual(1);
	});

	test("can remove a cached response from a fetch", async () => {
		let counter = 0;
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: counter++ }))
		});

		const response = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 100000
			}
		);
		expect(response.foo).toEqual(0);

		FetchHelper.removeCacheEntry("url");

		const response2 = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 1
			}
		);
		expect(response2.foo).toEqual(1);
	});

	test("can clear a cached response from a fetch", async () => {
		let counter = 0;
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: counter++ }))
		});

		const response = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 100000
			}
		);
		expect(response.foo).toEqual(0);

		FetchHelper.clearCache();

		const response2 = await FetchHelper.fetchJson<never, { foo: number }>(
			"source",
			"url",
			"GET",
			undefined,
			{
				cacheTtlMs: 1
			}
		);
		expect(response2.foo).toEqual(1);
	});
});
