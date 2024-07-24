// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "../../src/models/IValidationFailure";
import { Urn } from "../../src/types/urn";
import { I18n } from "../../src/utils/i18n";

describe("Urn", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("can generate an internal id", () => {
		const id = Urn.generateRandom("gtsc-ilt");

		const urn = id.toString().split(":");

		expect(urn[0]).toEqual("urn");
		expect(urn[1]).toEqual("gtsc-ilt");
		expect(urn[2].length).toEqual(64);
	});

	test("can fail to construct an id with no namespace id", () => {
		expect(() => new Urn("", "aaa")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "namespaceIdentifier", value: "" }
			})
		);
	});

	test("can fail to build an id with no namespace specific", () => {
		expect(() => new Urn("aaa", "")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "namespaceSpecific", value: "" }
			})
		);
	});

	test("can build an id with namespace identifier and specific", () => {
		const urn = new Urn("aaa", "bbb");

		expect(urn.toString()).toEqual("urn:aaa:bbb");
	});

	test("can build an id with namespace identifier and specific with additional sections", () => {
		const urn = new Urn("aaa", "bbb:ccc");

		expect(urn.toString()).toEqual("urn:aaa:bbb:ccc");
	});

	test("can build an id with namespace identifier and specific with additional colons", () => {
		const urn = new Urn("aaa:", ":bbb");

		expect(urn.toString()).toEqual("urn:aaa:bbb");
	});

	test("can fail fromValidString an empty urn", () => {
		expect(() => Urn.fromValidString("")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "namespaceIdentifier", value: "" }
			})
		);
	});

	test("can fail fromValidString an urn with no namespaceSpecific", () => {
		expect(() => Urn.fromValidString("aaa")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "namespaceSpecific", value: "" }
			})
		);
	});

	test("can fail fromValidString an urn with a urn and no namespaceIdentifier", () => {
		expect(() => Urn.fromValidString("urn:")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "namespaceIdentifier", value: "" }
			})
		);
	});

	test("can fromValidString a full urn", () => {
		const urn = Urn.fromValidString("urn:aaa:bbb");

		expect(urn.toString()).toEqual("urn:aaa:bbb");
	});

	test("can fromValidString a urn with no prefix", () => {
		const urn = Urn.fromValidString("aaa:bbb");

		expect(urn.toString()).toEqual("urn:aaa:bbb");
	});

	test("can fromValidString an extended urn", () => {
		const urn = Urn.fromValidString("aaa:bbb:ccc:ddd");

		expect(urn.toString()).toEqual("urn:aaa:bbb:ccc:ddd");
	});

	test("can fail to guard an empty urn and throw", () => {
		expect(() => Urn.guard("source", "foo", "")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.stringEmpty",
				properties: { property: "foo", value: "" }
			})
		);
	});

	test("can fail to guard an invalid urn and throw", () => {
		expect(() => Urn.guard("source", "foo", "urn:")).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.urn",
				properties: { property: "foo", value: "urn:" }
			})
		);
		expect(I18n.hasMessage("error.guard.urn")).toEqual(true);
	});

	test("can success to guard a valid urn", () => {
		Urn.guard("source", "foo", "aaa:bbb");
	});

	test("can fail to tryParseExact an empty urn", () => {
		const urn = Urn.tryParseExact("");

		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact an empty namespace identifier", () => {
		const urn = Urn.tryParseExact("urn:");
		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact an empty namespace specific", () => {
		const urn = Urn.tryParseExact("urn:aaa");
		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact an non prefixed urn", () => {
		const urn = Urn.tryParseExact("aaa");
		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact a blank namespace identifier", () => {
		const urn = Urn.tryParseExact("urn::aaa");

		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact an blank namespace specific", () => {
		const urn = Urn.tryParseExact("urn:aaa:");

		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact an blank namespace specific", () => {
		const urn = Urn.tryParseExact("urn:aaa:");

		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact with a zero length section", () => {
		const urn = Urn.tryParseExact("urn:aaa:bbb::ccc");

		expect(urn).toBeUndefined();
	});

	test("can fail to tryParseExact with a trailing separator", () => {
		const urn = Urn.tryParseExact("urn:aaa:bbb:ccc:");

		expect(urn).toBeUndefined();
	});

	test("can succeed tryParseExact a prefixed urn", () => {
		const urn = Urn.tryParseExact("urn:aaa:bbb");
		expect(urn).toBeDefined();
		expect(urn?.toString()).toEqual("urn:aaa:bbb");
	});

	test("can succeed tryParseExact a prefixed urn with extended namespaceSpecific", () => {
		const urn = Urn.tryParseExact("urn:aaa:bbb:ccc:ddd");
		expect(urn).toBeDefined();
		expect(urn?.toString()).toEqual("urn:aaa:bbb:ccc:ddd");
	});

	test("can fail to match a namespace with empty urn", () => {
		expect(Urn.hasNamespace("", "aaa")).toEqual(false);
	});

	test("can fail to match a namespace with same length", () => {
		expect(Urn.hasNamespace("aab", "aaa")).toEqual(false);
	});

	test("can fail to match a namespace with same length and urn prefix", () => {
		expect(Urn.hasNamespace("urn:aab", "aaa")).toEqual(false);
	});

	test("can match a namespace only", () => {
		expect(Urn.hasNamespace("aaa", "aaa")).toEqual(true);
	});

	test("can match a namespace as part of urn without prefix", () => {
		expect(Urn.hasNamespace("aaa:12345", "aaa")).toEqual(true);
	});

	test("can match a namespace as part of urn with prefix", () => {
		expect(Urn.hasNamespace("urn:aaa:12345", "aaa")).toEqual(true);
	});

	test("can fail to add a prefix when input is not a string", () => {
		expect(Urn.addPrefix(undefined as never)?.toString()).toEqual(undefined);
	});

	test("can add a prefix when none exists", () => {
		expect(Urn.addPrefix("aaa:12345")?.toString()).toEqual("urn:aaa:12345");
	});

	test("can add a prefix when when already exists", () => {
		expect(Urn.addPrefix("urn:aaa:12345")?.toString()).toEqual("urn:aaa:12345");
	});

	test("can fail to validate if the item is not a string", () => {
		const failures: IValidationFailure[] = [];
		const res = Urn.validate("foo", undefined as never, failures);
		expect(res).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].reason).toEqual("validation.notEmpty");
	});

	test("can fail to validate if the item is not a urn", () => {
		const failures: IValidationFailure[] = [];
		const res = Urn.validate("foo", "aaa", failures);
		expect(res).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].reason).toEqual("validation.beUrn");
	});

	test("can succeed validation if the item is a urn", () => {
		const failures: IValidationFailure[] = [];
		const res = Urn.validate("foo", "urn:aaa:bbb", failures);
		expect(res).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can succeed validation if the item is an extended urn", () => {
		const failures: IValidationFailure[] = [];
		const res = Urn.validate("foo", "urn:aaa:bbb:ccc", failures);
		expect(res).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can get a string version of the urn with a prefix", () => {
		expect(new Urn("aaa", "bbb").toString()).toEqual("urn:aaa:bbb");
	});

	test("can get a string version of an extended urn with a prefix", () => {
		expect(new Urn("aaa", "bbb:ccc:ddd").toString()).toEqual("urn:aaa:bbb:ccc:ddd");
	});

	test("can get a string version of the urn without a prefix", () => {
		expect(new Urn("aaa", "bbb").toString(true)).toEqual("aaa:bbb");
	});

	test("can get a string version of an extended urn without a prefix", () => {
		expect(new Urn("aaa", "bbb:ccc:ddd").toString(true)).toEqual("aaa:bbb:ccc:ddd");
	});
});
