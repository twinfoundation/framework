// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ObjectHelper } from "./objectHelper";
import { StringHelper } from "./stringHelper";
import { Is } from "../utils/is";

/**
 * Environment variable helper.
 */
export class EnvHelper {
	/**
	 * Get the environment variable as an object with camel cased names.
	 * @param envVars The environment variables.
	 * @param prefix The prefix of the environment variables, if not provided gets all.
	 * @returns The object with camel cased names.
	 */
	public static envToJson<T = { [id: string]: string }>(
		envVars: { [id: string]: string | undefined },
		prefix?: string
	): T {
		const result: { [id: string]: string } = {};

		if (!Is.empty(envVars)) {
			if (Is.empty(prefix)) {
				for (const envVar in envVars) {
					if (Is.stringValue(envVars[envVar])) {
						const camelCaseName = StringHelper.camelCase(envVar.toLowerCase());
						ObjectHelper.propertySet(result, camelCaseName, envVars[envVar]);
					}
				}
			} else {
				for (const envVar in envVars) {
					if (envVar.startsWith(prefix) && Is.stringValue(envVars[envVar])) {
						const camelCaseName = StringHelper.camelCase(envVar.replace(prefix, "").toLowerCase());
						ObjectHelper.propertySet(result, camelCaseName, envVars[envVar]);
					}
				}
			}
		}

		return result as T;
	}
}
