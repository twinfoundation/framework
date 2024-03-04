// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Url } from "../../src/types/url";

describe("Url", () => {
	test("can fail to create a url with empty string", () => {
		expect(() => new Url("")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "url", value: "" }
			})
		);
	});

	test("can fail to create a url with invalid url", () => {
		expect(() => new Url("abc")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.url",
				properties: { property: "url", value: "abc" }
			})
		);
	});

	test("can create a url from a string with all parts", () => {
		const url = new Url("https://a.b.c:80/path1/path2?a=b&c=d#foo");

		const parts = url.parts();

		expect(parts.schema).toEqual("https");
		expect(parts.host).toEqual("a.b.c");
		expect(parts.port).toEqual(80);
		expect(parts.path).toEqual("/path1/path2");
		expect(parts.params).toEqual("a=b&c=d");
		expect(parts.hash).toEqual("foo");
	});

	test("can create a url from a string with schema and host", () => {
		const url = new Url("https://a.b.c");

		const parts = url.parts();

		expect(parts.schema).toEqual("https");
		expect(parts.host).toEqual("a.b.c");
		expect(parts.port).toEqual(undefined);
		expect(parts.path).toEqual("/");
		expect(parts.params).toEqual(undefined);
		expect(parts.hash).toEqual(undefined);
	});

	test("can convert a url to a string", () => {
		const url = new Url("https://a.b.c:80/path1/path2?a=b&c=d#foo");

		expect(url.toString()).toEqual("https://a.b.c:80/path1/path2?a=b&c=d#foo");
	});

	test("can convert a url to a string with schema and host", () => {
		const url = new Url("https://a.b.c");

		expect(url.toString()).toEqual("https://a.b.c/");
	});
});
