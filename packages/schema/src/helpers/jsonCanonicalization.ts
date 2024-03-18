// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Canonicalizes a JSON object.
 */
export class JsonCanonicalization {
	/**
	 * Serializes in canonical format.
	 * @param object The object to be serialized.
	 * @returns The serialized object.
	 */
	public static serialize(object: unknown): string {
		let buffer = "";
		if (object === null || typeof object !== "object") {
			// Primitive data type - Use ES6/JSON
			buffer += JSON.stringify(object);
		} else if (Array.isArray(object)) {
			// ///////////////////////////////////////////////
			// Array - Maintain element order              //
			// ///////////////////////////////////////////////
			buffer += "[";
			let next = false;
			for (const element of object) {
				if (next) {
					buffer += ",";
				}
				next = true;
				// ///////////////////////////////////////
				// Array element - Recursive expansion //
				// ///////////////////////////////////////
				buffer += JsonCanonicalization.serialize(element);
			}
			buffer += "]";
		} else {
			// ///////////////////////////////////////////////
			// Object - Sort properties before serializing //
			// ///////////////////////////////////////////////
			buffer += "{";
			let next = false;
			const keys = Object.keys(object).sort();
			for (const property of keys) {
				if (next) {
					buffer += ",";
				}
				next = true;
				// /////////////////////////////////////////////
				// Property names are strings - Use ES6/JSON //
				// /////////////////////////////////////////////
				buffer += JSON.stringify(property);
				buffer += ":";
				// ////////////////////////////////////////
				// Property value - Recursive expansion //
				// ////////////////////////////////////////
				buffer += JsonCanonicalization.serialize((object as { [id: string]: unknown })[property]);
			}
			buffer += "}";
		}

		return buffer;
	}
}
