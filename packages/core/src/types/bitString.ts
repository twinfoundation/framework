// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { nameof } from "@gtsc/nameof";
import { GeneralError } from "../errors/generalError";
import { Guards } from "../utils/guards";

/**
 * A class to represent a bit string.
 */
export class BitString {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<BitString>();

	/**
	 * The storage for the bits.
	 * @internal
	 */
	private readonly _bits: Uint8Array;

	/**
	 * The number of bits stored in the buffer.
	 * @internal
	 */
	private readonly _numberBits: number;

	/**
	 * Create a new instance of BitString.
	 * @param numberBits The length of the bit string.
	 */
	constructor(numberBits: number) {
		Guards.integer(BitString._CLASS_NAME, nameof(numberBits), numberBits);
		this._numberBits = numberBits;
		this._bits = new Uint8Array(Math.ceil(numberBits / 8));
	}

	/**
	 * Create a new instance of BitString from a bit array.
	 * @param bits The bits to create the bit string from.
	 * @param numberBits The number of bits in the bit string.
	 * @returns The new instance of BitString.
	 */
	public static fromBits(bits: Uint8Array, numberBits: number): BitString {
		Guards.uint8Array(BitString._CLASS_NAME, nameof(bits), bits);
		Guards.integer(BitString._CLASS_NAME, nameof(numberBits), numberBits);
		const bs = new BitString(numberBits);
		bs._bits.set(bits);
		return bs;
	}

	/**
	 * Get the bit at the given index.
	 * @param index The index to get the bit for.
	 * @returns True if the bit at the index is set.
	 * @throws GeneralError if the index is out of range.
	 */
	public getBit(index: number): boolean {
		Guards.integer(BitString._CLASS_NAME, nameof(index), index);
		if (index < 0 || index >= this._numberBits) {
			throw new GeneralError(BitString._CLASS_NAME, "outOfRange", {
				index,
				numberBits: this._numberBits
			});
		}

		const byteIndex = Math.floor(index / 8);
		const bitIndex = index % 8;
		return (this._bits[byteIndex] & (1 << bitIndex)) !== 0;
	}

	/**
	 * Set the bit at the given index.
	 * @param index The index to set the bit for.
	 * @param value The value to set the bit to.
	 * @throws GeneralError if the index is out of range.
	 */
	public setBit(index: number, value: boolean): void {
		if (index < 0 || index >= this._numberBits) {
			throw new GeneralError(BitString._CLASS_NAME, "outOfRange", {
				index,
				numberBits: this._numberBits
			});
		}
		const byteIndex = Math.floor(index / 8);
		const bitIndex = index % 8;
		if (value) {
			this._bits[byteIndex] |= 1 << bitIndex;
		} else {
			this._bits[byteIndex] &= ~(1 << bitIndex);
		}
	}

	/**
	 * Get the bits of the bit string.
	 * @returns The bits stored in a Uint8Array.
	 */
	public getBits(): Uint8Array {
		return this._bits;
	}

	/**
	 * Get the length of the bit string.
	 * @returns The length of the bit string.
	 */
	public getLength(): number {
		return this._numberBits;
	}
}
