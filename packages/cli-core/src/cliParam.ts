// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Converter, GeneralError, Guards, Is, Url } from "@gtsc/core";
import { Bech32 } from "@gtsc/crypto";

/**
 * Parameter utilities for the CLI.
 */
export class CLIParam {
	/**
	 * Check the option to see if it exists.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static env(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean
	): string | undefined {
		if (allowEnvVar && optionValue?.startsWith("!")) {
			const envValueName = optionValue.slice(1);
			const envValue = process.env[envValueName];
			if (Is.empty(envValue)) {
				throw new GeneralError("commands", "commands.common.missingEnv", {
					option: optionName,
					value: envValueName
				});
			} else {
				optionValue = envValue;
			}
		}
		return optionValue;
	}

	/**
	 * Check the option to see if it exists.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static stringValue(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): string {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		Guards.stringValue("commands", optionName, optionValue);
		return optionValue;
	}

	/**
	 * Check the option to see if it a url.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static url(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): string {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		Url.guard("commands", optionName, optionValue);
		return optionValue;
	}

	/**
	 * Check the option to see if it exists and is a number.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @param minValue The minimum value.
	 * @param maxValue The maximum value.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static number(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true,
		minValue: number = 0,
		maxValue?: number
	): number {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		const coerced = Coerce.number(optionValue);
		if (Is.number(coerced)) {
			if (Is.number(minValue) && coerced < minValue) {
				throw new GeneralError("commands", "commands.common.optionMinValue", {
					option: optionName,
					value: optionValue,
					minValue
				});
			} else if (Is.number(maxValue) && coerced > maxValue) {
				throw new GeneralError("commands", "commands.common.optionMaxValue", {
					option: optionName,
					value: optionValue,
					maxValue
				});
			}
			return coerced;
		}
		Guards.number("commands", optionName, optionValue);
		return 0;
	}

	/**
	 * Check the option to see if it exists and is an integer.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @param minValue The minimum value.
	 * @param maxValue The maximum value.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static integer(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true,
		minValue: number = 0,
		maxValue?: number
	): number {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		const coerced = Coerce.number(optionValue);
		if (Is.integer(coerced)) {
			if (Is.number(minValue) && coerced < minValue) {
				throw new GeneralError("commands", "commands.common.optionMinValue", {
					option: optionName,
					value: optionValue,
					minValue
				});
			} else if (Is.number(maxValue) && coerced > maxValue) {
				throw new GeneralError("commands", "commands.common.optionMaxValue", {
					option: optionName,
					value: optionValue,
					maxValue
				});
			}
			return coerced;
		}
		Guards.integer("commands", optionName, optionValue);
		return 0;
	}

	/**
	 * Check the option to see if it exists and is a big number.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @param minValue The minimum value.
	 * @param maxValue The maximum value.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static bigint(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true,
		minValue: bigint = 0n,
		maxValue?: bigint
	): bigint {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		const coerced = Coerce.bigint(optionValue);
		if (Is.bigint(coerced)) {
			if (Is.bigint(minValue) && coerced < minValue) {
				throw new GeneralError("commands", "commands.common.optionMinValue", {
					option: optionName,
					value: optionValue,
					minValue
				});
			} else if (Is.bigint(maxValue) && coerced > maxValue) {
				throw new GeneralError("commands", "commands.common.optionMaxValue", {
					option: optionName,
					value: optionValue,
					maxValue
				});
			}
			return coerced;
		}
		Guards.bigint("commands", optionName, optionValue);
		return 0n;
	}

	/**
	 * Check the option to see if it exists and is a boolean.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static boolean(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): boolean {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);
		const coerced = Coerce.boolean(optionValue);
		if (Is.boolean(coerced)) {
			return coerced;
		}
		Guards.boolean("commands", optionName, optionValue);
		return false;
	}

	/**
	 * Check the option to see if it exists and is hex.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static hex(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): Uint8Array {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);

		if (Is.stringHex(optionValue, true)) {
			return Converter.hexToBytes(optionValue);
		}
		throw new GeneralError("commands", "commands.common.optionInvalidHex", {
			option: optionName,
			value: optionValue
		});
	}

	/**
	 * Check the option to see if it exists and is base64.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static base64(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): Uint8Array {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);

		if (Is.stringBase64(optionValue)) {
			return Converter.base64ToBytes(optionValue);
		}
		throw new GeneralError("commands", "commands.common.optionInvalidBase64", {
			option: optionName,
			value: optionValue
		});
	}

	/**
	 * Check the option to see if it exists and is hex or base64.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static hexBase64(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): Uint8Array {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);

		if (Is.stringHex(optionValue, true)) {
			return Converter.hexToBytes(optionValue);
		} else if (Is.stringBase64(optionValue)) {
			return Converter.base64ToBytes(optionValue);
		}
		throw new GeneralError("commands", "commands.common.optionInvalidHexBase64", {
			option: optionName,
			value: optionValue
		});
	}

	/**
	 * Check the option to see if it exists and is bech32.
	 * @param optionName The name of the option.
	 * @param optionValue The option value.
	 * @param allowEnvVar Allow the option to be read from an env var.
	 * @returns The final option value.
	 * @throws An error if the option is invalid.
	 */
	public static bech32(
		optionName: string,
		optionValue: string | undefined,
		allowEnvVar: boolean = true
	): string {
		optionValue = CLIParam.env(optionName, optionValue, allowEnvVar);

		if (Bech32.isBech32(optionValue)) {
			return optionValue;
		}
		throw new GeneralError("commands", "commands.common.optionInvalidBech32", {
			option: optionName,
			value: optionValue
		});
	}
}
