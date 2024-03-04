// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import stripJsonComments from "strip-json-comments";
import { Guards } from "./guards.js";
import { Is } from "./is.js";

/**
 * Class to help with configuration object.
 */
export class ConfigHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<ConfigHelper>();

	/**
	 * Strip comments from the config.
	 * @param config The configuration content.
	 * @returns The configuration content with comments stripped.
	 */
	public static stripComments(config: string): string {
		Guards.string(ConfigHelper._CLASS_NAME, nameof(config), config);

		return stripJsonComments(config);
	}

	/**
	 * Expand environment variables.
	 * @param config The configuration object.
	 * @returns The updated configuration object.
	 */
	public static substituteEnvironment<T>(
		config: string,
		processEnv: { [prop: string]: string | undefined }
	): T {
		Guards.string(ConfigHelper._CLASS_NAME, nameof(config), config);

		// We replace numbers and the quotes that enclose them
		config = config.replace(/"__ENV_N_([A-Z_]*?)__"/g, (_, $1) => {
			if (Is.undefined(processEnv[$1])) {
				return _;
			}
			return processEnv[$1] ?? "0";
		});

		// We replace booleans and the quotes that enclose them
		config = config.replace(/"__ENV_B_([A-Z_]*?)__"/g, (_, $1) => {
			if (Is.undefined(processEnv[$1])) {
				return _;
			}
			return processEnv[$1] ?? "false";
		});

		// Strings are substituted in place
		config = config.replace(/__ENV_S_([A-Z_]*?)__/g, (_, $1) => {
			if (Is.undefined(processEnv[$1])) {
				return _;
			}
			return processEnv[$1] ?? "";
		});

		return JSON.parse(config) as T;
	}
}
