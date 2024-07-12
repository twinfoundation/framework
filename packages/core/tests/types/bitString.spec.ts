// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BitString } from "../../src/types/bitString";
import { I18n } from "../../src/utils/i18n";

describe("BitString", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("can fail to construct with no number bits", () => {
		expect(() => new BitString(undefined as unknown as number)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.integer",
				properties: {
					property: "numberBits",
					value: "undefined"
				}
			})
		);
	});

	test("can construct with number bits", () => {
		const bitString = new BitString(100);
		expect(bitString.getLength()).toEqual(100);
		expect(bitString.getBits().length).toEqual(13);
	});

	test("can fail to construct with missing bits", () => {
		expect(() => BitString.fromBits(undefined as unknown as Uint8Array, 0)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.uint8Array",
				properties: {
					property: "bits",
					value: "undefined"
				}
			})
		);
	});

	test("can fail to construct with missing number bits", () => {
		expect(() => BitString.fromBits(new Uint8Array(), undefined as unknown as number)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.integer",
				properties: {
					property: "numberBits",
					value: "undefined"
				}
			})
		);
	});

	test("can create with a bits array", () => {
		const bitString = BitString.fromBits(new Uint8Array(13), 100);
		expect(bitString.getLength()).toEqual(100);
		expect(bitString.getBits().length).toEqual(13);
	});

	test("can fail to set bits if index is out of range", () => {
		const bitString = new BitString(10);

		expect(() => bitString.setBit(10, true)).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bitString.outOfRange",
				properties: {
					index: 10,
					numberBits: 10
				}
			})
		);
		expect(I18n.hasMessage("error.bitString.outOfRange")).toEqual(true);
	});

	test("can set bits in an array", () => {
		const bitString = new BitString(10);
		bitString.setBit(8, true);

		const bits = bitString.getBits();
		expect(bits[0]).toEqual(0);
		expect(bits[1]).toEqual(1);
	});

	test("can clear bits in an array", () => {
		const bitString = new BitString(10);
		bitString.setBit(8, true);
		bitString.setBit(8, false);

		const bits = bitString.getBits();
		expect(bits[0]).toEqual(0);
		expect(bits[1]).toEqual(0);
	});

	test("can fail to get bits if index is out of range", () => {
		const bitString = new BitString(10);

		expect(() => bitString.getBit(10)).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bitString.outOfRange",
				properties: {
					index: 10,
					numberBits: 10
				}
			})
		);
		expect(I18n.hasMessage("error.bitString.outOfRange")).toEqual(true);
	});

	test("can get bits in an array", () => {
		const bitString = new BitString(10);
		bitString.setBit(8, true);

		expect(bitString.getBit(8)).toEqual(true);
	});
});
