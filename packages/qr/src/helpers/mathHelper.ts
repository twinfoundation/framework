// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */

import { GeneralError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";

/**
 * Class to helper with math.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class MathHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<MathHelper>();

	/**
	 * @internal
	 */
	private static _EXP_TABLE: number[];

	/**
	 * @internal
	 */
	private static _LOG_TABLE: number[];

	/**
	 * Initialize the math helper.
	 */
	public static initialize(): void {
		if (!MathHelper._EXP_TABLE) {
			MathHelper._EXP_TABLE = [];
			MathHelper._LOG_TABLE = [];
			for (let i = 0; i < 256; i++) {
				MathHelper._EXP_TABLE.push(
					i < 8
						? 1 << i
						: MathHelper._EXP_TABLE[i - 4] ^
								MathHelper._EXP_TABLE[i - 5] ^
								MathHelper._EXP_TABLE[i - 6] ^
								MathHelper._EXP_TABLE[i - 8]
				);
				MathHelper._LOG_TABLE.push(0);
			}
			for (let i = 0; i < 255; i++) {
				MathHelper._LOG_TABLE[MathHelper._EXP_TABLE[i]] = i;
			}
		}
	}

	/**
	 * Get the log of the value.
	 * @param value The value to get the log of.
	 * @returns The log of the value.
	 * @throws Error if value < 1.
	 */
	public static gLog(value: number): number {
		if (value < 1) {
			throw new GeneralError(MathHelper._CLASS_NAME, "lessThanOne", { value });
		}
		return MathHelper._LOG_TABLE[value];
	}

	/**
	 * Get the exponent of the value.
	 * @param value The value to get the exponent of.
	 * @returns The exponent of the value.
	 */
	public static gExp(value: number): number {
		let localValue = value;
		while (localValue < 0) {
			localValue += 255;
		}
		while (localValue >= 256) {
			localValue -= 255;
		}
		return MathHelper._EXP_TABLE[localValue];
	}
}
