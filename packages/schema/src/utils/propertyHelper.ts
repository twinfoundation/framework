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
	public static getValue<T, U extends IProperty = IProperty>(
		properties: U[] | undefined,
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
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setValue<T, U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		type: string,
		value: T | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
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

				if (Is.objectValue(additionalProperties)) {
					Object.assign(properties[existingIndex], additionalProperties);
				}
			}
		} else if (!isEmpty) {
			properties.push({
				key,
				type,
				value,
				...additionalProperties
			} as U);
		}
	}

	/**
	 * Remove property with the specific key.
	 * @param properties The properties list to look in.
	 * @param key The key of the item to remove.
	 */
	public static removeValue<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): void {
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
	public static getText<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): string | undefined {
		return PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_TEXT);
	}

	/**
	 * Set some text in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setText<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: string | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.string(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_TEXT,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a urn from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getUrn<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): string | undefined {
		return PropertyHelper.getValue<string, U>(properties, key, StockDataTypes.TYPE_URN);
	}

	/**
	 * Set a urn in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setUrn<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: string | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Urn.guard(nameof<PropertyHelper>(), "value", value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			StockDataTypes.TYPE_URN,
			value,
			additionalProperties
		);
	}

	/**
	 * Get an integer from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getInteger<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(properties, key, SchemaOrgDataTypes.TYPE_INTEGER);
	}

	/**
	 * Set an integer in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setInteger<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.integer(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_INTEGER,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a float from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getFloat<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(properties, key, SchemaOrgDataTypes.TYPE_FLOAT);
	}

	/**
	 * Set a float in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setFloat<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.number(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_FLOAT,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a boolean from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getBoolean<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): boolean | undefined {
		return PropertyHelper.getValue<boolean, U>(properties, key, SchemaOrgDataTypes.TYPE_BOOLEAN);
	}

	/**
	 * Set a boolean in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setBoolean<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: boolean | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.boolean(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<boolean, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_BOOLEAN,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a date time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDateTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		return Coerce.dateTime(
			PropertyHelper.getValue<Date, U>(properties, key, SchemaOrgDataTypes.TYPE_DATE_TIME)
		);
	}

	/**
	 * Set a date time in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setDateTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_DATE_TIME,
			value?.toISOString(),
			additionalProperties
		);
	}

	/**
	 * Get a date from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDate<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		return Coerce.date(
			PropertyHelper.getValue<string, U>(properties, key, SchemaOrgDataTypes.TYPE_DATE)
		);
	}

	/**
	 * Set a date in ISO format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setDate<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_DATE,
				dt.slice(0, idx),
				additionalProperties
			);
		} else {
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_DATE,
				value,
				additionalProperties
			);
		}
	}

	/**
	 * Get a time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		const time = PropertyHelper.getValue<string, U>(properties, key, SchemaOrgDataTypes.TYPE_TIME);
		return Coerce.time(`1970-01-01T${time}Z`);
	}

	/**
	 * Set a time in standard format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			const idx2 = dt.indexOf("Z");
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_TIME,
				dt.slice(idx + 1, idx2),
				additionalProperties
			);
		} else {
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_TIME,
				value,
				additionalProperties
			);
		}
	}

	/**
	 * Get a timestamp in milliseconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampMilliseconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(
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
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTimestampMilliseconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.timestampMilliseconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			StockDataTypes.TYPE_TIMESTAMP_MILLISECONDS,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a timestamp in seconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampSeconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(
			properties,
			key,
			StockDataTypes.TYPE_TIMESTAMP_SECONDS
		);
	}

	/**
	 * Set a timestamp in seconds in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTimestampSeconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.timestampSeconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			StockDataTypes.TYPE_TIMESTAMP_SECONDS,
			value,
			additionalProperties
		);
	}

	/**
	 * Reduce the keys in the property list.
	 * @param properties The properties list to filter.
	 * @param includeKeys The keys to include.
	 * @returns The filtered list.
	 */
	public static filterInclude<U extends IProperty = IProperty>(
		properties?: U[],
		includeKeys?: string[]
	): U[] | undefined {
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
	public static filterExclude<U extends IProperty = IProperty>(
		properties?: U[],
		excludeKeys?: string[]
	): U[] | undefined {
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
	public static merge<U extends IProperty = IProperty>(properties1?: U[], properties2?: U[]): U[] {
		const listMerged = ObjectHelper.clone<U[]>(properties1 ?? []);

		if (Is.arrayValue(properties2)) {
			for (const prop of properties2) {
				const { key, type, value, ...additionalProperties } = prop;
				PropertyHelper.setValue(listMerged, key, type, value, additionalProperties);
			}
		}

		return listMerged;
	}
}
