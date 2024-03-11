// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { nameof } from "@gtsc/nameof";
import type { BitBuffer } from "../helpers/bitBuffer";
import { QRDataBase } from "../models/qrDataBase";
import { QRDataMode } from "../models/qrDataMode";

/**
 * QR Data for representing a 8 bit data.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class QRByte8 extends QRDataBase {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<QRByte8>();

	/**
	 * Create a new instance of QRByte8.
	 * @param data The data for the qr 8 bit data.
	 */
	constructor(data: string) {
		super(QRByte8._CLASS_NAME, QRDataMode.Byte8, data);
	}

	/**
	 * Get the length of the data.
	 * @returns The length of the data.
	 */
	public getLength(): number {
		return this.stringToBytes(this.getData()).length;
	}

	/**
	 * Write data into the buffer.
	 * @param buffer The buffer to write into.
	 */
	public write(buffer: BitBuffer): void {
		const data = this.stringToBytes(this.getData());
		for (let i = 0; i < data.length; i++) {
			buffer.put(data[i], 8);
		}
	}

	/**
	 * @internal
	 */
	private stringToBytes(str: string): number[] {
		const utf8: number[] = [];
		for (let i = 0; i < str.length; i++) {
			let charCode = str.charCodeAt(i);
			if (charCode < 0x80) {
				utf8.push(charCode);
			} else if (charCode < 0x800) {
				utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
			} else if (charCode < 0xd800 || charCode >= 0xe000) {
				utf8.push(
					0xe0 | (charCode >> 12),
					0x80 | ((charCode >> 6) & 0x3f),
					0x80 | (charCode & 0x3f)
				);
			} else {
				i++;
				// UTF-16 encodes 0x10000-0x10FFFF by
				// subtracting 0x10000 and splitting the
				// 20 bits of 0x0-0xFFFFF into two halves
				charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
				utf8.push(
					0xf0 | (charCode >> 18),
					0x80 | ((charCode >> 12) & 0x3f),
					0x80 | ((charCode >> 6) & 0x3f),
					0x80 | (charCode & 0x3f)
				);
			}
		}
		return utf8;
	}
}
