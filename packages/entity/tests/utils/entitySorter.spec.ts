// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { SortDirection } from "../../src/models/sortDirection";
import { EntitySorter } from "../../src/utils/entitySorter";

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

		vals.sort((a, b) => EntitySorter.compare(a, b, "valNum", "integer", SortDirection.Ascending));

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

		vals.sort((a, b) => EntitySorter.compare(a, b, "valNum", "integer", SortDirection.Descending));

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

		vals.sort((a, b) => EntitySorter.compare(a, b, "valString", "string", SortDirection.Ascending));

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

		vals.sort((a, b) =>
			EntitySorter.compare(a, b, "valString", "string", SortDirection.Descending)
		);

		expect(vals[0].valString).toEqual("cccc");
		expect(vals[1].valString).toEqual("bbbb");
		expect(vals[2].valString).toEqual("aaaa");
	});

	test("can sort single keys and return quickly", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>([], []);

		expect(result.length).toEqual(0);
	});

	test("can sort single keys and return quickly", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[{ id: "1", value1: "aaa", value2: "bbb" }],
			[]
		);

		expect(result.length).toEqual(1);
	});

	test("can sort single keys with a single entry", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[{ id: "1", value1: "aaa", value2: "bbb" }],
			[{ property: "id", type: "string", sortDirection: SortDirection.Ascending }]
		);

		expect(result.length).toEqual(1);
		expect(result[0].id).toEqual("1");
	});

	test("can sort single keys with a more than one entry", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[
				{ id: "2", value1: "aaa", value2: "bbb" },
				{ id: "1", value1: "aaa", value2: "bbb" }
			],
			[{ property: "id", type: "string", sortDirection: SortDirection.Ascending }]
		);

		expect(result.length).toEqual(2);
		expect(result[0].id).toEqual("1");
		expect(result[1].id).toEqual("2");
	});

	test("can sort multiple keys with a more than one entry", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[
				{ id: "2", value1: "bbb", value2: "aaa" },
				{ id: "1", value1: "aaa", value2: "ddd" },
				{ id: "3", value1: "aaa", value2: "bbb" }
			],
			[
				{ property: "value1", type: "string", sortDirection: SortDirection.Ascending },
				{ property: "value2", type: "string", sortDirection: SortDirection.Ascending }
			]
		);

		expect(result.length).toEqual(3);
		expect(result[0].id).toEqual("3");
		expect(result[1].id).toEqual("1");
		expect(result[2].id).toEqual("2");
	});

	test("can sort multiple keys with a more than one entry and different sort orders", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[
				{ id: "2", value1: "bbb", value2: "aaa" },
				{ id: "1", value1: "aaa", value2: "ddd" },
				{ id: "3", value1: "aaa", value2: "bbb" }
			],
			[
				{ property: "value1", type: "string", sortDirection: SortDirection.Ascending },
				{ property: "value2", type: "string", sortDirection: SortDirection.Descending }
			]
		);

		expect(result.length).toEqual(3);
		expect(result[0].id).toEqual("1");
		expect(result[1].id).toEqual("3");
		expect(result[2].id).toEqual("2");
	});

	test("can sort multiple keys when all values are the same", async () => {
		const result = EntitySorter.sort<{ id: string; value1: string; value2: string }>(
			[
				{ id: "2", value1: "aaa", value2: "bbb" },
				{ id: "1", value1: "aaa", value2: "bbb" },
				{ id: "3", value1: "aaa", value2: "bbb" }
			],
			[
				{ property: "value1", type: "string", sortDirection: SortDirection.Ascending },
				{ property: "value2", type: "string", sortDirection: SortDirection.Ascending }
			]
		);

		expect(result.length).toEqual(3);
		expect(result[0].id).toEqual("2");
		expect(result[1].id).toEqual("1");
		expect(result[2].id).toEqual("3");
	});
});
