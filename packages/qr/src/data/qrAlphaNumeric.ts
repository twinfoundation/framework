// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-mixed-operators */
import { GeneralError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { BitBuffer } from "../helpers/bitBuffer";
import { QRDataBase } from "../models/qrDataBase";
import { QRDataMode } from "../models/qrDataMode";

/**
 * QR Data for representing a alpha numeric.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class QRAlphaNumeric extends QRDataBase {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<QRAlphaNumeric>();

	/**
	 * Create a new instance of QRAlphaNumeric.
	 * @param data The data for the qr alpha numeric.
	 */
	constructor(data: string) {
		super(QRAlphaNumeric._CLASS_NAME, QRDataMode.AlphaNumeric, data);
	}

	/**
	 * Get the length of the data.
	 * @returns The length of the data.
	 */
	public getLength(): number {
		return this.getData().length;
	}

	/**
	 * Write data into the buffer.
	 * @param buffer The buffer to write into.
	 */
	public write(buffer: BitBuffer): void {
		const s = this.getData();
		let i = 0;

		while (i + 1 < s.length) {
			buffer.put(this.getCode(s.charAt(i)) * 45 + this.getCode(s.charAt(i + 1)), 11);
			i += 2;
		}

		if (i < s.length) {
			buffer.put(this.getCode(s.charAt(i)), 6);
		}
	}

	/**
	 * @internal
	 */
	private getCode(c: string): number {
		if (c >= "0" && c <= "9") {
			return c.charCodeAt(0) - "0".charCodeAt(0);
		}
		if (c >= "A" && c <= "Z") {
			return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
		}
		switch (c) {
			case " ":
				return 36;
			case "$":
				return 37;
			case "%":
				return 38;
			case "*":
				return 39;
			case "+":
				return 40;
			case "-":
				return 41;
			case ".":
				return 42;
			case "/":
				return 43;
			case ":":
				return 44;
			default:
				throw new GeneralError(QRAlphaNumeric._CLASS_NAME, "illegalCharacter", { value: c });
		}
	}
}
