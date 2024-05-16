// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n } from "@gtsc/core";
import type { IEntitySchema } from "../../src/models/IEntitySchema";
import { SortDirection } from "../../src/models/sortDirection";
import { EntitySchemaHelper } from "../../src/utils/entitySchemaHelper";

describe("EntitySchemaHelper", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("can fail to get primary keys if there is no schema", async () => {
		expect(() => EntitySchemaHelper.getPrimaryKey(undefined as unknown as IEntitySchema)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined",
				properties: { property: "entitySchema", value: "undefined" }
			})
		);
	});

	test("can fail to get primary keys if there is are none", async () => {
		expect(() =>
			EntitySchemaHelper.getPrimaryKey<{ id: string }>({
				type: "test",
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
				message: "entitySchemaHelper.noIsPrimary"
			})
		);
		expect(I18n.hasMessage("error.entitySchemaHelper.noIsPrimary")).toEqual(true);
	});

	test("can fail to get primary keys if there is are multiple", async () => {
		expect(() =>
			EntitySchemaHelper.getPrimaryKey<{ id: string; id2: string }>({
				type: "test",
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
				message: "entitySchemaHelper.multipleIsPrimary"
			})
		);
		expect(I18n.hasMessage("error.entitySchemaHelper.multipleIsPrimary")).toEqual(true);
	});

	test("can get primary keys if there is is only one", async () => {
		const result = EntitySchemaHelper.getPrimaryKey<{ id: string; id2: string }>({
			type: "test",
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

	test("can fail to get sort keys if there is no schema", async () => {
		expect(() =>
			EntitySchemaHelper.getSortProperties(undefined as unknown as IEntitySchema)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined"
			})
		);
	});

	test("can get no sort keys if none are defined", async () => {
		const result = EntitySchemaHelper.getSortProperties<{ id: string; id2: string }>({
			type: "test",
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
		const result = EntitySchemaHelper.getSortProperties<{ id: string; id2: string }>({
			type: "test",
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

	test("can fail to build sort keys if there is no schema", async () => {
		expect(() =>
			EntitySchemaHelper.buildSortProperties(undefined as unknown as IEntitySchema)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.objectUndefined"
			})
		);
	});

	test("can build sort keys with no overrides", async () => {
		const result = EntitySchemaHelper.buildSortProperties<{ id: string; id2: string }>({
			type: "test",
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
		const result = EntitySchemaHelper.buildSortProperties<{ id: string; id2: string }>(
			{
				type: "test",
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
