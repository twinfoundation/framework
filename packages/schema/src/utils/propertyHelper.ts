// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Guards, Is, ObjectHelper, Urn } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { SchemaOrgDataTypes } from "../dataTypes/schemaOrgDataTypes";
import { StockDataTypes } from "../dataTypes/stockDataTypes";
import type { IProperty } from "../models/IProperty";

/**
 * Class to help with properties.
 */
export class PropertyHelper {
	/**
	 * Get property with the specific key.
	 * @param properties The properties list to look in.
	 * @param key The key of the item to find.
	 * @param type Will only return the value if the type matches or is undefined.
	 * @returns The item if it was found.
	 */
	public static getValue<T>(
		properties: IProperty[] | undefined,
		key: string,
		type?: string
	): T | undefined {
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		if (Is.arrayValue(properties)) {
			const item = properties.find(p => p.key === key);

			if (Is.object<IProperty>(item) && (Is.undefined(type) || item.type === type)) {
				return item.value as T;
			}
		}
	}

	/**
	 * Set a property in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param type The type of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setValue<T>(
		properties: IProperty[],
		key: string,
		type: string,
		value: T | undefined
	): void {
		Guards.array(nameof<PropertyHelper>(), nameof(properties), properties);
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		Guards.stringValue(nameof<PropertyHelper>(), nameof(type), type);

		const isEmpty = Is.empty(value);

		const existingIndex = properties.findIndex(m => m.key === key);
		if (existingIndex >= 0) {
			if (isEmpty) {
				properties.splice(existingIndex, 1);
			} else {
				properties[existingIndex].value = value;
			}
		} else if (!isEmpty) {
			properties.push({
				key,
				type,
				value
			});
		}
	}

	/**
	 * Remove property with the specific key.
	 * @param properties The properties list to look in.
	 * @param key The key of the item to remove.
	 */
	public static removeValue(properties: IProperty[] | undefined, key: string): void {
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		if (Is.arrayValue(properties)) {
			const item = properties.findIndex(p => p.key === key);

			if (item >= 0) {
				properties.splice(item, 1);
			}
		}
	}

	/**
	 * Get some text from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getText(properties: IProperty[] | undefined, key: string): string | undefined {
		return PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_TEXT);
	}

	/**
	 * Set some text in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setText(properties: IProperty[], key: string, value: string | undefined): void {
		if (!Is.empty(value)) {
			Guards.string(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_TEXT, value);
	}

	/**
	 * Get a urn from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getUrn(properties: IProperty[] | undefined, key: string): string | undefined {
		return PropertyHelper.getValue<string>(properties, key, StockDataTypes.TYPE_URN);
	}

	/**
	 * Set a urn in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setUrn(properties: IProperty[], key: string, value: string | undefined): void {
		if (!Is.empty(value)) {
			Urn.guard(nameof<PropertyHelper>(), "value", value);
		}
		PropertyHelper.setValue(properties, key, StockDataTypes.TYPE_URN, value);
	}

	/**
	 * Get an integer from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getInteger(properties: IProperty[] | undefined, key: string): number | undefined {
		return PropertyHelper.getValue<number>(properties, key, SchemaOrgDataTypes.TYPE_INTEGER);
	}

	/**
	 * Set an integer in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setInteger(properties: IProperty[], key: string, value: number | undefined): void {
		if (!Is.empty(value)) {
			Guards.integer(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_INTEGER, value);
	}

	/**
	 * Get a float from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getFloat(properties: IProperty[] | undefined, key: string): number | undefined {
		return PropertyHelper.getValue<number>(properties, key, SchemaOrgDataTypes.TYPE_FLOAT);
	}

	/**
	 * Set a float in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setFloat(properties: IProperty[], key: string, value: number | undefined): void {
		if (!Is.empty(value)) {
			Guards.number(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_FLOAT, value);
	}

	/**
	 * Get a boolean from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getBoolean(properties: IProperty[] | undefined, key: string): boolean | undefined {
		return PropertyHelper.getValue<boolean>(properties, key, SchemaOrgDataTypes.TYPE_BOOLEAN);
	}

	/**
	 * Set a boolean in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setBoolean(properties: IProperty[], key: string, value: boolean | undefined): void {
		if (!Is.empty(value)) {
			Guards.boolean(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_BOOLEAN, value);
	}

	/**
	 * Get a date time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDateTime(properties: IProperty[] | undefined, key: string): Date | undefined {
		return Coerce.dateTime(
			PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_DATE_TIME)
		);
	}

	/**
	 * Set a date time in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setDateTime(properties: IProperty[], key: string, value: Date | undefined): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_DATE_TIME,
			value?.toISOString()
		);
	}

	/**
	 * Get a date from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDate(properties: IProperty[] | undefined, key: string): Date | undefined {
		return Coerce.date(
			PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_DATE)
		);
	}

	/**
	 * Set a date in ISO format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setDate(properties: IProperty[], key: string, value: Date | undefined): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_DATE, dt.slice(0, idx));
		} else {
			PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_DATE, value);
		}
	}

	/**
	 * Get a time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTime(properties: IProperty[] | undefined, key: string): Date | undefined {
		const time = PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_TIME);
		return Coerce.time(`1970-01-01T${time}Z`);
	}

	/**
	 * Set a time in standard format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setTime(properties: IProperty[], key: string, value: Date | undefined): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			const idx2 = dt.indexOf("Z");
			PropertyHelper.setValue(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_TIME,
				dt.slice(idx + 1, idx2)
			);
		} else {
			PropertyHelper.setValue(properties, key, SchemaOrgDataTypes.TYPE_TIME, value);
		}
	}

	/**
	 * Get a timestamp in milliseconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampMilliseconds(
		properties: IProperty[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number>(
			properties,
			key,
			StockDataTypes.TYPE_TIMESTAMP_MILLISECONDS
		);
	}

	/**
	 * Set a timestamp in milliseconds in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setTimestampMilliseconds(
		properties: IProperty[],
		key: string,
		value: number | undefined
	): void {
		if (!Is.empty(value)) {
			Guards.timestampMilliseconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, StockDataTypes.TYPE_TIMESTAMP_MILLISECONDS, value);
	}

	/**
	 * Get a timestamp in seconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampSeconds(
		properties: IProperty[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number>(properties, key, StockDataTypes.TYPE_TIMESTAMP_SECONDS);
	}

	/**
	 * Set a timestamp in seconds in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 */
	public static setTimestampSeconds(
		properties: IProperty[],
		key: string,
		value: number | undefined
	): void {
		if (!Is.empty(value)) {
			Guards.timestampSeconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue(properties, key, StockDataTypes.TYPE_TIMESTAMP_SECONDS, value);
	}

	/**
	 * Reduce the keys in the property list.
	 * @param properties The properties list to filter.
	 * @param includeKeys The keys to include.
	 * @returns The filtered list.
	 */
	public static filterInclude<T extends IProperty = IProperty>(
		properties?: T[],
		includeKeys?: string[]
	): IProperty[] | undefined {
		if (Is.arrayValue(properties)) {
			return Is.array(includeKeys)
				? properties.filter(p => includeKeys.includes(p.key))
				: properties;
		}
	}

	/**
	 * Filter the keys from the properties.
	 * @param properties The properties list to filter.
	 * @param excludeKeys The keys to filter.
	 * @returns The filtered list.
	 */
	public static filterExclude<T extends IProperty = IProperty>(
		properties?: T[],
		excludeKeys?: string[]
	): IProperty[] | undefined {
		if (Is.arrayValue(properties)) {
			return Is.array(excludeKeys)
				? properties.filter(p => !excludeKeys.includes(p.key))
				: properties;
		}
	}

	/**
	 * Merge two property lists.
	 * @param properties1 The current profile properties.
	 * @param properties2 The new properties to merge in to the first list.
	 * @returns The merged list.
	 */
	public static merge(properties1?: IProperty[], properties2?: IProperty[]): IProperty[] {
		const listMerged = ObjectHelper.clone<IProperty[]>(properties1 ?? []);

		if (Is.arrayValue(properties2)) {
			for (const prop of properties2) {
				PropertyHelper.setValue(listMerged, prop.key, prop.type, prop.value);
			}
		}

		return listMerged;
	}
}
