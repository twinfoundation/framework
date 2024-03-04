// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Sorter } from "../../src/utils/sorter";

/**
 * Test item.
 */
interface ITestItem {
	/**
	 * Test number.
	 */
	valNum: number;
	/**
	 * Test string.
	 */
	valString: string;
}

describe("Sorter", () => {
	test("compare can sort values ascending if they are numbers", async () => {
		const vals: ITestItem[] = [
			{
				valNum: 2,
				valString: "aaaa"
			},
			{
				valNum: 4,
				valString: "aaaa"
			},
			{
				valNum: 1,
				valString: "aaaa"
			}
		];

		vals.sort((a, b) => Sorter.compare(a, b, "valNum", "integer", "asc"));

		expect(vals[0].valNum).toEqual(1);
		expect(vals[1].valNum).toEqual(2);
		expect(vals[2].valNum).toEqual(4);
	});

	test("compare can sort values descending if they are numbers", async () => {
		const vals: ITestItem[] = [
			{
				valNum: 2,
				valString: "aaaa"
			},
			{
				valNum: 4,
				valString: "aaaa"
			},
			{
				valNum: 1,
				valString: "aaaa"
			}
		];

		vals.sort((a, b) => Sorter.compare(a, b, "valNum", "integer", "desc"));

		expect(vals[0].valNum).toEqual(4);
		expect(vals[1].valNum).toEqual(2);
		expect(vals[2].valNum).toEqual(1);
	});

	test("compare can sort values ascending if they are strings", async () => {
		const vals: ITestItem[] = [
			{
				valNum: 1,
				valString: "bbbb"
			},
			{
				valNum: 1,
				valString: "cccc"
			},
			{
				valNum: 1,
				valString: "aaaa"
			}
		];

		vals.sort((a, b) => Sorter.compare(a, b, "valString", "string", "asc"));

		expect(vals[0].valString).toEqual("aaaa");
		expect(vals[1].valString).toEqual("bbbb");
		expect(vals[2].valString).toEqual("cccc");
	});

	test("compare can sort values descending if they are strings", async () => {
		const vals: ITestItem[] = [
			{
				valNum: 1,
				valString: "bbbb"
			},
			{
				valNum: 1,
				valString: "cccc"
			},
			{
				valNum: 1,
				valString: "aaaa"
			}
		];

		vals.sort((a, b) => Sorter.compare(a, b, "valString", "string", "desc"));

		expect(vals[0].valString).toEqual("cccc");
		expect(vals[1].valString).toEqual("bbbb");
		expect(vals[2].valString).toEqual("aaaa");
	});
});
