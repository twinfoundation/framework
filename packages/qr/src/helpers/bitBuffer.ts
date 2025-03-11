// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
/**
 * Class for maintaining data bits.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class BitBuffer {
	/**
	 * @internal
	 */
	private readonly _buffer: number[];

	/**
	 * @internal
	 */
	private _length: number;

	/**
	 * Create a new instance of BitBuffer.
	 */
	constructor() {
		this._buffer = [];
		this._length = 0;
	}

	/**
	 * Get the buffer.
	 * @returns The buffer.
	 */
	public getBuffer(): number[] {
		return this._buffer;
	}

	/**
	 * Get the length in bits.
	 * @returns The length.
	 */
	public getLengthInBits(): number {
		return this._length;
	}

	/**
	 * Put a value in to the bit buffer.
	 * @param num The value.
	 * @param length The length.
	 */
	public put(num: number, length: number): void {
		for (let i = 0; i < length; i++) {
			this.putBit(((num >>> (length - i - 1)) & 1) === 1);
		}
	}

	/**
	 * Put a bit.
	 * @param bit The bit to put.
	 */
	public putBit(bit: boolean): void {
		if (this._length === this._buffer.length * 8) {
			this._buffer.push(0);
		}
		if (bit) {
			this._buffer[~~(this._length / 8)] |= 0x80 >>> this._length % 8;
		}
		this._length++;
	}

	/**
	 * Convert to string.
	 * @returns The buffer as string.
	 */
	public toString(): string {
		let buffer = "";
		for (let i = 0; i < this.getLengthInBits(); i++) {
			buffer += this.getBit(i) ? "1" : "0";
		}
		return buffer;
	}

	/**
	 * @internal
	 */
	private getBit(index: number): boolean {
		return ((this._buffer[~~(index / 8)] >>> (7 - (index % 8))) & 1) === 1;
	}
}
