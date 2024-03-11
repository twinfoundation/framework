// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { MathHelper } from "./mathHelper";

/**
 * Class to represent a polynomial.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class Polynomial {
	/**
	 * @internal
	 */
	private readonly _num: number[];

	/**
	 * Create a new instance of Polynomial.
	 * @param num The num of the polynomial.
	 * @param shift The shift for the polynomial.
	 */
	constructor(num: number[], shift: number = 0) {
		let offset = 0;

		while (offset < num.length && num[offset] === 0) {
			offset++;
		}

		this._num = [];
		const len = num.length - offset;
		for (let i = 0; i < len; i++) {
			this._num.push(num[offset + i]);
		}
		for (let i = 0; i < shift; i++) {
			this._num.push(0);
		}
	}

	/**
	 * The the value of the polynomial at given index.
	 * @param index The index.
	 * @returns The value of the polynomial.
	 */
	public getAt(index: number): number {
		return this._num[index];
	}

	/**
	 * Get the length of the polynomial.
	 * @returns The polynomial.
	 */
	public getLength(): number {
		return this._num.length;
	}

	/**
	 * Convert the polynomial to a string.
	 * @returns The string representation of the polynomial.
	 */
	public toString(): string {
		let buffer = "";
		for (let i = 0; i < this.getLength(); i++) {
			if (i > 0) {
				buffer += ",";
			}
			buffer += this.getAt(i);
		}
		return buffer.toString();
	}

	/**
	 * Get the log representation of the polynomial.
	 * @returns The log representation of the polynomial.
	 */
	public toLogString(): string {
		let buffer = "";
		for (let i = 0; i < this.getLength(); i++) {
			if (i > 0) {
				buffer += ",";
			}
			buffer += MathHelper.gLog(this.getAt(i));
		}
		return buffer.toString();
	}

	/**
	 * Multiply the polynomial with another one.
	 * @param e The polynomial to multiply.
	 * @returns The multiplication of the polynomials.
	 */
	public multiply(e: Polynomial): Polynomial {
		const num: number[] = [];
		const len = this.getLength() + e.getLength() - 1;
		for (let i = 0; i < len; i++) {
			num.push(0);
		}
		for (let i = 0; i < this.getLength(); i++) {
			for (let j = 0; j < e.getLength(); j++) {
				num[i + j] ^= MathHelper.gExp(MathHelper.gLog(this.getAt(i)) + MathHelper.gLog(e.getAt(j)));
			}
		}
		return new Polynomial(num);
	}

	/**
	 * Get the modulus of the polynomial from another.
	 * @param e The polynomial.
	 * @returns The modules of the polynomials.
	 */
	public mod(e: Polynomial): Polynomial {
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}

		const ratio = MathHelper.gLog(this.getAt(0)) - MathHelper.gLog(e.getAt(0));

		// create copy
		const num: number[] = [];
		for (let i = 0; i < this.getLength(); i++) {
			num.push(this.getAt(i));
		}

		// subtract and calc rest.
		for (let i = 0; i < e.getLength(); i++) {
			num[i] ^= MathHelper.gExp(MathHelper.gLog(e.getAt(i)) + ratio);
		}

		// call recursively
		return new Polynomial(num).mod(e);
	}
}
