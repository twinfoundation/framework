// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Coerce, Is, Url, Validation, type IValidationFailure } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { GeoCoordinates } from "schema-dts";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";

/**
 * Handle all the data types for schema.org.
 */
export class SchemaOrgDataTypes {
	/**
	 * Represents text storage.
	 */
	public static TYPE_TEXT = "https://schema.org/Text";

	/**
	 * Represents integer number values.
	 */
	public static TYPE_INTEGER = "https://schema.org/Integer";

	/**
	 * Represents floating point numbers.
	 */
	public static TYPE_FLOAT = "https://schema.org/Float";

	/**
	 * Represents a boolean.
	 */
	public static TYPE_BOOLEAN = "https://schema.org/Boolean";

	/**
	 * Represents a url.
	 */
	public static TYPE_URL = "https://schema.org/URL";

	/**
	 * Represents a date as an ISO format string.
	 */
	public static TYPE_DATE = "https://schema.org/Date";

	/**
	 * Represents a date time as an ISO format string.
	 */
	public static TYPE_DATE_TIME = "https://schema.org/DateTime";

	/**
	 * Represents a time as an ISO format string.
	 */
	public static TYPE_TIME = "https://schema.org/Time";

	/**
	 * Represents a url which points to an image.
	 */
	public static TYPE_IMAGE = "https://schema.org/image";

	/**
	 * Represents a location.
	 */
	public static TYPE_GEO_COORDINATES = "https://schema.org/GeoCoordinates";

	/**
	 * Represents a structured value.
	 */
	public static TYPE_STRUCTURED_VALUE = "https://schema.org/StructuredValue";

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_TEXT, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_TEXT,
			defaultValue: "",
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.string(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_INTEGER, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_INTEGER,
			defaultValue: 0,
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.integer(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_FLOAT, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_FLOAT,
			defaultValue: 0,
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.number(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_BOOLEAN, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_BOOLEAN,
			defaultValue: true,
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.boolean(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_URL, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_URL,
			defaultValue: "",
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Url.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_DATE, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_DATE,
			defaultValue: new Date(),
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.dateString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_DATE_TIME, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_DATE_TIME,
			defaultValue: new Date(),
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.dateTimeString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_TIME, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_TIME,
			defaultValue: new Date(),
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.timeString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_IMAGE, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_IMAGE,
			defaultValue: "",
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Url.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_GEO_COORDINATES, () => ({
			isInternal: false,
			type: SchemaOrgDataTypes.TYPE_GEO_COORDINATES,
			defaultValue: { longitude: 0, latitude: 0 },
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				SchemaOrgDataTypes.validateGeoCoordinates(propertyName, value, failures)
		}));
	}

	/**
	 * Validate if the property is valid geo-coordinates.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is geo-coordinates.
	 */
	public static validateGeoCoordinates(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is GeoCoordinates {
		const is = Is.object<GeoCoordinates>(value);

		if (is) {
			// This is only a partial validation at the moment we should also support
			// address, addressCountry, elevation, postalCode as alternative
			// to gps coords
			let lat: number | undefined;
			if (Is.number(value.latitude)) {
				lat = value.latitude;
			} else if (Is.stringValue(value.latitude)) {
				lat = Coerce.number(value.latitude);
			}

			if (Is.number(lat)) {
				if (lat < -90 || lat > 90) {
					failures.push({
						property: nameof(value.latitude, propertyName),
						reason: "validation.geo.coordinatesLatitudeRange"
					});
				}
			} else {
				failures.push({
					property: nameof(value.latitude, propertyName),
					reason: "validation.geo.coordinatesLatitudeNumber"
				});
			}

			let lng: number | undefined;
			if (Is.number(value.longitude)) {
				lng = value.longitude;
			} else if (Is.stringValue(value.longitude)) {
				lng = Coerce.number(value.longitude);
			}

			if (Is.number(lng)) {
				if (lng < -180 || lng > 180) {
					failures.push({
						property: nameof(value.longitude, propertyName),
						reason: "validation.geo.coordinatesLongitudeRange"
					});
				}
			} else {
				failures.push({
					property: nameof(value.longitude, propertyName),
					reason: "validation.geo.coordinatesLongitudeNumber"
				});
			}
		}

		return is;
	}
}
