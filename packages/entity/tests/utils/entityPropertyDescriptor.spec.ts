// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityDescriptor } from "../../src/models/IEntityDescriptor";
import { SortDirection } from "../../src/models/sortDirection";
import { EntityPropertyDescriptor } from "../../src/utils/entityPropertyDescriptor";

describe("EntityPropertyDescriptor", () => {
	test("can fail to get primary keys if there is no descriptor", async () => {
		expect(() =>
			EntityPropertyDescriptor.getPrimaryKey(undefined as unknown as IEntityDescriptor<unknown>)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined"
			})
		);
	});

	test("can fail to get primary keys if there is are none", async () => {
		expect(() =>
			EntityPropertyDescriptor.getPrimaryKey<{ id: string }>({
				name: "test",
				properties: [
					{
						property: "id",
						type: "string"
					}
				]
			})
		).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "entityPropertyDescriptor.noIsPrimary"
			})
		);
	});

	test("can fail to get primary keys if there is are multiple", async () => {
		expect(() =>
			EntityPropertyDescriptor.getPrimaryKey<{ id: string; id2: string }>({
				name: "test",
				properties: [
					{
						property: "id",
						type: "string",
						isPrimary: true
					},
					{
						property: "id2",
						type: "string",
						isPrimary: true
					}
				]
			})
		).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "entityPropertyDescriptor.multipleIsPrimary"
			})
		);
	});

	test("can get primary keys if there is is only one", async () => {
		const result = EntityPropertyDescriptor.getPrimaryKey<{ id: string; id2: string }>({
			name: "test",
			properties: [
				{
					property: "id",
					type: "string",
					isPrimary: true
				},
				{
					property: "id2",
					type: "string"
				}
			]
		});

		expect(result.property).toEqual("id");
	});

	test("can fail to get sort keys if there is no descriptor", async () => {
		expect(() =>
			EntityPropertyDescriptor.getSortProperties(undefined as unknown as IEntityDescriptor<unknown>)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined"
			})
		);
	});

	test("can get no sort keys if none are defined", async () => {
		const result = EntityPropertyDescriptor.getSortProperties<{ id: string; id2: string }>({
			name: "test",
			properties: [
				{
					property: "id",
					type: "string",
					isPrimary: true
				},
				{
					property: "id2",
					type: "string"
				}
			]
		});

		expect(result).toBeUndefined();
	});

	test("can get sort keys", async () => {
		const result = EntityPropertyDescriptor.getSortProperties<{ id: string; id2: string }>({
			name: "test",
			properties: [
				{
					property: "id",
					type: "string",
					isPrimary: true,
					sortDirection: SortDirection.Ascending
				},
				{
					property: "id2",
					type: "string",
					sortDirection: SortDirection.Descending
				}
			]
		});

		expect(result?.length).toEqual(2);
		expect(result?.[0].property).toEqual("id");
		expect(result?.[0].sortDirection).toEqual(SortDirection.Ascending);
		expect(result?.[1].property).toEqual("id2");
		expect(result?.[1].sortDirection).toEqual(SortDirection.Descending);
	});

	test("can fail to build sort keys if there is no descriptor", async () => {
		expect(() =>
			EntityPropertyDescriptor.buildSortProperties(
				undefined as unknown as IEntityDescriptor<unknown>
			)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined"
			})
		);
	});

	test("can build sort keys with no overrides", async () => {
		const result = EntityPropertyDescriptor.buildSortProperties<{ id: string; id2: string }>({
			name: "test",
			properties: [
				{
					property: "id",
					type: "string",
					isPrimary: true,
					sortDirection: SortDirection.Ascending
				},
				{
					property: "id2",
					type: "string",
					sortDirection: SortDirection.Descending
				}
			]
		});

		expect(result?.length).toEqual(2);
		expect(result?.[0].property).toEqual("id");
		expect(result?.[0].sortDirection).toEqual(SortDirection.Ascending);
		expect(result?.[1].property).toEqual("id2");
		expect(result?.[1].sortDirection).toEqual(SortDirection.Descending);
	});

	test("can build sort keys with overrides", async () => {
		const result = EntityPropertyDescriptor.buildSortProperties<{ id: string; id2: string }>(
			{
				name: "test",
				properties: [
					{
						property: "id",
						type: "string",
						isPrimary: true,
						sortDirection: SortDirection.Ascending
					},
					{
						property: "id2",
						type: "string",
						sortDirection: SortDirection.Descending
					}
				]
			},
			[{ property: "id2", sortDirection: SortDirection.Ascending }]
		);

		expect(result?.length).toEqual(1);
		expect(result?.[0].property).toEqual("id2");
		expect(result?.[0].sortDirection).toEqual(SortDirection.Ascending);
	});
});
