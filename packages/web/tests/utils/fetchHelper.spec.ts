// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethods } from "../../src/models/httpMethods";
import { HttpStatusCodes } from "../../src/models/httpStatusCodes";
import type { IFetchOptions } from "../../src/models/IFetchOptions";
import type { IHttpRequestHeaders } from "../../src/models/IHttpRequestHeaders";
import { FetchHelper } from "../../src/utils/fetchHelper";

const fetchMock = vi.fn();

describe("FetchHelper", () => {
	beforeEach(() => {
		globalThis.fetch = fetchMock;
	});

	afterEach(() => {
		fetchMock.mockReset();
	});

	test("can fail to get a response from a fetch with no source", async () => {
		await expect(
			FetchHelper.fetch(undefined as unknown as string, "endpoint", "path", "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "source",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no endpoint", async () => {
		await expect(
			FetchHelper.fetch("source", undefined as unknown as string, "path", "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "endpoint",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no endpoint", async () => {
		await expect(
			FetchHelper.fetch("source", undefined as unknown as string, "path", "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "endpoint",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no path", async () => {
		await expect(
			FetchHelper.fetch("source", "endpoint", undefined as unknown as string, "GET")
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.string",
			properties: {
				property: "path",
				value: "undefined"
			}
		});
	});

	test("can fail to get a response from a fetch with no path", async () => {
		await expect(
			FetchHelper.fetch("source", "endpoint", "path", undefined as unknown as HttpMethods)
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
			FetchHelper.fetch("source", "endpoint", "path", "POST", 1 as unknown as string)
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
			FetchHelper.fetch(
				"source",
				"endpoint",
				"path",
				"GET",
				undefined,
				"" as unknown as IFetchOptions
			)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				headers: ""
			} as unknown as IHttpRequestHeaders)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				timeoutMs: ""
			} as unknown as IHttpRequestHeaders)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				includeCredentials: ""
			} as unknown as IHttpRequestHeaders)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				retryCount: ""
			} as unknown as IHttpRequestHeaders)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				retryDelayMs: ""
			} as unknown as IHttpRequestHeaders)
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, { timeoutMs: 1 })
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.timeout",
			properties: {
				httpStatus: HttpStatusCodes.REQUEST_TIMEOUT,
				path: "path"
			}
		});
	});

	test("can fail to get a response from a fetch", async () => {
		fetchMock.mockRejectedValue({
			ok: false
		});
		await expect(FetchHelper.fetch("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.general",
			properties: {
				httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR,
				path: "path"
			}
		});
	});

	test("can get a response from a fetch and includeCredentials", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
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

		const response = await FetchHelper.fetch("source", "endpoint", "path", "GET");
		const json = await response.json();
		expect(json.foo).toEqual("bar");
	});

	test("can fail to get a response from a fetchJson when JSON is invalid", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.OK,
			json: async () => new Promise(resolve => resolve(JSON.parse("!")))
		});
		await expect(FetchHelper.fetchJson("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.decodingJSON",
			properties: {
				httpStatus: HttpStatusCodes.BAD_REQUEST,
				path: "path"
			}
		});
	});

	test("can fail to get a response from a fetchwith failed connectivity", async () => {
		// eslint-disable-next-line no-restricted-syntax
		fetchMock.mockRejectedValue(new Error("Failed to fetch"));
		await expect(FetchHelper.fetch("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCodes.SERVICE_UNAVAILABLE,
				path: "path"
			}
		});
	});

	test("can fail to get a response with a custom status code", async () => {
		// eslint-disable-next-line no-restricted-syntax
		fetchMock.mockRejectedValue({ httpStatus: HttpStatusCodes.BAD_GATEWAY });
		await expect(FetchHelper.fetch("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCodes.BAD_GATEWAY,
				path: "path"
			}
		});
	});

	test("can fail to get a response with a custom status text", async () => {
		// eslint-disable-next-line no-restricted-syntax
		fetchMock.mockRejectedValue({ statusText: "foo" });
		await expect(FetchHelper.fetch("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR,
				path: "path"
			}
		});
	});

	test("can fail to get a response from a fetchJson when response is not ok", async () => {
		fetchMock.mockResolvedValue({
			ok: false,
			status: HttpStatusCodes.UNAUTHORIZED,
			statusText: "Unauthorized",
			json: async () => new Promise(resolve => resolve("Unauthorized"))
		});
		await expect(FetchHelper.fetchJson("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCodes.UNAUTHORIZED,
				path: "path"
			}
		});
	});

	test("can get a response from a fetchJson with POST and payload", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.NO_CONTENT
		});

		const response = await FetchHelper.fetchJson<{ foo: string }, { foo: string }>(
			"source",
			"endpoint",
			"path",
			"POST",
			{ foo: "bar" }
		);
		expect(response).toEqual({});
	});

	test("can get an empty response from a fetchJson", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.NO_CONTENT
		});

		const response = await FetchHelper.fetchJson<never, { foo: string }>(
			"source",
			"endpoint",
			"path",
			"GET"
		);
		expect(response).toEqual({});
	});

	test("can get a response from a fetchJson", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.OK,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetchJson<never, { foo: string }>(
			"source",
			"endpoint",
			"path",
			"GET"
		);
		expect(response.foo).toEqual("bar");
	});

	test("can fail to get a response from a fetchJson with retries with status", async () => {
		fetchMock
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCodes.UNAUTHORIZED,
				statusText: "Unauthorized1"
			})
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCodes.UNAUTHORIZED,
				statusText: "Unauthorized2"
			})
			.mockResolvedValueOnce({
				ok: false,
				status: HttpStatusCodes.UNAUTHORIZED,
				statusText: "Unauthorized3"
			});

		await expect(
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				retryCount: 2,
				retryDelayMs: 100
			})
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.retryLimitExceeded",
			source: "source",
			properties: {
				httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR,
				path: "path"
			},
			inner: {
				name: "FetchError",
				source: "source",
				message: "fetchHelper.general",
				properties: {
					httpStatus: HttpStatusCodes.UNAUTHORIZED,
					path: "path",
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
			FetchHelper.fetch("source", "endpoint", "path", "GET", undefined, {
				retryCount: 2,
				retryDelayMs: 100
			})
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.retryLimitExceeded",
			source: "source",
			properties: {
				httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR,
				path: "path"
			},
			inner: {
				name: "FetchError",
				source: "source",
				message: "fetchHelper.general",
				properties: {
					httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR,
					path: "path",
					statusText: "Unauthorized2"
				}
			}
		});
	});

	test("can fail to get a response from a fetchJson with json response object", async () => {
		fetchMock.mockImplementation(() => ({
			ok: false,
			status: HttpStatusCodes.OK,
			statusText: "Custom",
			json: async (): Promise<{ foo: string }> => new Promise(resolve => resolve({ foo: "bar" }))
		}));

		await expect(FetchHelper.fetchJson("source", "endpoint", "path", "GET")).rejects.toMatchObject({
			name: "FetchError",
			source: "source",
			message: "fetchHelper.failureStatusText",
			properties: {
				httpStatus: HttpStatusCodes.OK,
				path: "path",
				statusText: "Custom"
			}
		});
	});

	test("can fail to post a response from a fetchBinary when JSON is invalid", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.OK,
			json: async () => new Promise(resolve => resolve(JSON.parse("!")))
		});
		await expect(
			FetchHelper.fetchBinary("source", "endpoint", "path", "POST")
		).rejects.toMatchObject({
			name: "FetchError",
			message: "fetchHelper.decodingJSON",
			properties: {
				httpStatus: HttpStatusCodes.BAD_REQUEST,
				path: "path"
			}
		});
	});

	test("can fail to get a response from a fetchBinary when response is not ok", async () => {
		fetchMock.mockResolvedValue({
			ok: false,
			status: HttpStatusCodes.UNAUTHORIZED,
			statusText: "Unauthorized",
			json: async () => new Promise(resolve => resolve("Unauthorized"))
		});
		await expect(
			FetchHelper.fetchBinary("source", "endpoint", "path", "GET")
		).rejects.toMatchObject({
			name: "FetchError",
			properties: {
				httpStatus: HttpStatusCodes.UNAUTHORIZED,
				path: "path"
			}
		});
	});

	test("can get an empty response from a fetchBinary with JSON request payload", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.NO_CONTENT,
			json: async () => new Promise(resolve => resolve({ foo: "bar" }))
		});

		const response = await FetchHelper.fetchBinary<{ foo: string }>(
			"source",
			"endpoint",
			"path",
			"POST"
		);
		expect(response).toBeDefined();
	});

	test("can get an empty response from a fetchBinary", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.NO_CONTENT
		});

		const response: Uint8Array = await FetchHelper.fetchBinary("source", "endpoint", "path", "GET");
		expect(response.length).toEqual(0);
	});

	test("can get a response from a fetchBinary", async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			status: HttpStatusCodes.OK,
			arrayBuffer: async () => new Promise(resolve => resolve(new Uint8Array([1, 2, 3])))
		});

		const response: Uint8Array = await FetchHelper.fetchBinary("source", "endpoint", "path", "GET");
		expect(response[0]).toEqual(1);
		expect(response[1]).toEqual(2);
		expect(response[2]).toEqual(3);
	});
});
