// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable array-bracket-newline */

import { GeneralError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * JPEG Encoder.
 * Based on JPEG encoder ported to JavaScript and optimized by Andreas Ritter.
 */
export class JpegEncoder {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<JpegEncoder>();

	/**
	 * @internal
	 */
	private static readonly _STD_DC_LUMINANCE_NR_CODES: number[] = [
		0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0
	];

	/**
	 * @internal
	 */
	private static readonly _STD_DC_LUMINANCE_VALUES: number[] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	];

	/**
	 * @internal
	 */
	private static readonly _STD_AC_LUMINANCE_NR_CODES: number[] = [
		0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d
	];

	/**
	 * @internal
	 */
	private static readonly _STD_AC_LUMINANCE_VALUES: number[] = [
		0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07,
		0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0,
		0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28,
		0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49,
		0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69,
		0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89,
		0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7,
		0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5,
		0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2,
		0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8,
		0xf9, 0xfa
	];

	/**
	 * @internal
	 */
	private static readonly _STD_DC_CHROMINANCE_NR_CODES: number[] = [
		0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0
	];

	/**
	 * @internal
	 */
	private static readonly _STD_DC_CHROMINANCE_VALUES: number[] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	];

	/**
	 * @internal
	 */
	private static readonly _STD_AC_CHROMINANCE_NR_CODES: number[] = [
		0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77
	];

	/**
	 * @internal
	 */
	private static readonly _STD_AC_CHROMINANCE_VALUES: number[] = [
		0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71,
		0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91, 0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0,
		0x15, 0x62, 0x72, 0xd1, 0x0a, 0x16, 0x24, 0x34, 0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26,
		0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48,
		0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
		0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,
		0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5,
		0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3,
		0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda,
		0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8,
		0xf9, 0xfa
	];

	/** @internal */
	private static readonly _SIG_ZAG: number[] = [
		0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11,
		18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34,
		37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63
	];

	/**
	 * @internal
	 */
	private readonly _yTable: number[];

	/**
	 * @internal
	 */
	private readonly _uvTable: number[];

	/**
	 * @internal
	 */
	private readonly _fdTblY: number[];

	/**
	 * @internal
	 */
	private readonly _fdTblUV: number[];

	/**
	 * @internal
	 */
	private _ydcHashTable: number[][] | undefined;

	/**
	 * @internal
	 */
	private _uVdcHashTable: number[][] | undefined;

	/**
	 * @internal
	 */
	private _yacHashTable: number[][] | undefined;

	/**
	 * @internal
	 */
	private _uVacHashTable: number[][] | undefined;

	/**
	 * @internal
	 */
	private readonly _bitCode: number[][];

	/**
	 * @internal
	 */
	private readonly _category: number[];

	/**
	 * @internal
	 */
	private readonly _outputFDctQuant: number[];

	/**
	 * @internal
	 */
	private readonly _du: number[];

	/**
	 * @internal
	 */
	private _byteOut: number[];

	/**
	 * @internal
	 */
	private _byteNew: number;

	/**
	 * @internal
	 */
	private _bytePos: number;

	/**
	 * @internal
	 */
	private readonly _ydu: number[];

	/**
	 * @internal
	 */
	private readonly _udu: number[];

	/**
	 * @internal
	 */
	private readonly _vdu: number[];

	/**
	 * @internal
	 */
	private readonly _rgbYuvTable: number[];

	/**
	 * Create a new instance of JpegEncoder.
	 */
	constructor() {
		this._yTable = Array.from({ length: 64 });
		this._uvTable = Array.from({ length: 64 });
		this._fdTblY = Array.from({ length: 64 });
		this._fdTblUV = Array.from({ length: 64 });

		this._bitCode = Array.from({ length: 65535 });
		this._category = Array.from({ length: 65535 });
		this._outputFDctQuant = Array.from({ length: 64 });
		this._du = Array.from({ length: 64 });
		this._byteOut = [];
		this._byteNew = 0;
		this._bytePos = 7;

		this._ydu = Array.from({ length: 64 });
		this._udu = Array.from({ length: 64 });
		this._vdu = Array.from({ length: 64 });
		this._rgbYuvTable = Array.from({ length: 2048 });

		this.initHuffmanTbl();
		this.initCategoryNumber();
		this.initRGBYUVTable();
	}

	/**
	 * Encode the image with the given quality.
	 * @param width The width of the image to encode.
	 * @param height The height of the image to encode.
	 * @param imageData The data for the image.
	 * @param quality The quality to encode the image at.
	 * @returns The data for the encoded image.
	 */
	public encode(width: number, height: number, imageData: Uint8Array, quality: number): Uint8Array {
		this.setQuality(quality);

		// Initialize bit writer
		this._byteOut = [];
		this._byteNew = 0;
		this._bytePos = 7;

		// Add JPEG headers
		this.writeWord(0xffd8); // SOI
		this.writeAPP0();
		this.writeDQT();
		this.writeSOF0(width, height);
		this.writeDHT();
		this.writeSOS();

		// Encode 8x8 macro blocks
		let DCY = 0;
		let DCU = 0;
		let DCV = 0;

		this._byteNew = 0;
		this._bytePos = 7;

		const quadWidth = width * 4;

		let x;
		let y = 0;
		let r;
		let g;
		let b;
		let start;
		let p;
		let col;
		let row;
		let pos;
		while (y < height) {
			x = 0;
			while (x < quadWidth) {
				start = quadWidth * y + x;
				p = start;
				col = -1;
				row = 0;

				for (pos = 0; pos < 64; pos++) {
					row = pos >> 3; // /8
					col = (pos & 7) * 4; // %8
					p = start + row * quadWidth + col;

					if (y + row >= height) {
						// padding bottom
						p -= quadWidth * (y + 1 + row - height);
					}

					if (x + col >= quadWidth) {
						// padding right
						p -= x + col - quadWidth + 4;
					}

					r = imageData[p++];
					g = imageData[p++];
					b = imageData[p++];

					// use lookup table (slightly faster)
					this._ydu[pos] =
						((this._rgbYuvTable[r] +
							this._rgbYuvTable[Math.trunc(g + 256)] +
							this._rgbYuvTable[Math.trunc(b + 512)]) >>
							16) -
						128;
					this._udu[pos] =
						((this._rgbYuvTable[Math.trunc(r + 768)] +
							this._rgbYuvTable[Math.trunc(g + 1024)] +
							this._rgbYuvTable[Math.trunc(b + 1280)]) >>
							16) -
						128;
					this._vdu[pos] =
						((this._rgbYuvTable[Math.trunc(r + 1280)] +
							this._rgbYuvTable[Math.trunc(g + 1536)] +
							this._rgbYuvTable[Math.trunc(b + 1792)]) >>
							16) -
						128;
				}

				if (this._ydcHashTable && this._yacHashTable) {
					DCY = this.processDU(
						this._ydu,
						this._fdTblY,
						DCY,
						this._ydcHashTable,
						this._yacHashTable
					);
				}
				if (this._uVdcHashTable && this._uVacHashTable) {
					DCU = this.processDU(
						this._udu,
						this._fdTblUV,
						DCU,
						this._uVdcHashTable,
						this._uVacHashTable
					);
				}
				if (this._uVdcHashTable && this._uVacHashTable) {
					DCV = this.processDU(
						this._vdu,
						this._fdTblUV,
						DCV,
						this._uVdcHashTable,
						this._uVacHashTable
					);
				}
				x += 32;
			}
			y += 8;
		}

		// Do the bit alignment of the EOI marker
		if (this._bytePos >= 0) {
			const fillBits = [];
			fillBits[1] = this._bytePos + 1;
			fillBits[0] = (1 << (this._bytePos + 1)) - 1;
			this.writeBits(fillBits);
		}

		this.writeWord(0xffd9); // EOI

		return new Uint8Array(this._byteOut);
	}

	/**
	 * @internal
	 */
	private setQuality(quality: number): void {
		if (quality <= 0 || quality > 100) {
			throw new GeneralError(JpegEncoder._CLASS_NAME, "invalidQuality", { value: quality });
		}

		let sf = 0;
		if (quality < 50) {
			sf = Math.floor(5000 / quality);
		} else {
			sf = Math.floor(200 - quality * 2);
		}

		this.initQuantTables(sf);
	}

	/**
	 * @internal
	 */
	private initQuantTables(sf: number): void {
		const YQT = [
			16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69,
			56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104,
			113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99
		];

		for (let i = 0; i < 64; i++) {
			let t = Math.floor((YQT[i] * sf + 50) / 100);
			if (t < 1) {
				t = 1;
			} else if (t > 255) {
				t = 255;
			}
			this._yTable[JpegEncoder._SIG_ZAG[i]] = t;
		}
		const UVQT = [
			17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99,
			99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
			99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99
		];
		for (let j = 0; j < 64; j++) {
			let u = Math.floor((UVQT[j] * sf + 50) / 100);
			if (u < 1) {
				u = 1;
			} else if (u > 255) {
				u = 255;
			}
			this._uvTable[JpegEncoder._SIG_ZAG[j]] = u;
		}
		const aAsf = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];
		let k = 0;
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				this._fdTblY[k] = 1 / (this._yTable[JpegEncoder._SIG_ZAG[k]] * aAsf[row] * aAsf[col] * 8);
				this._fdTblUV[k] = 1 / (this._uvTable[JpegEncoder._SIG_ZAG[k]] * aAsf[row] * aAsf[col] * 8);
				k++;
			}
		}
	}

	/**
	 * @internal
	 */
	private computeHuffmanTbl(nrCodes: number[], stdTable: number[]): number[][] {
		let codeValue = 0;
		let posInTable = 0;
		const HT: number[][] = [];
		for (let k = 1; k <= 16; k++) {
			for (let j = 1; j <= nrCodes[k]; j++) {
				HT[stdTable[posInTable]] = [];
				HT[stdTable[posInTable]][0] = codeValue;
				HT[stdTable[posInTable]][1] = k;
				posInTable++;
				codeValue++;
			}
			codeValue *= 2;
		}
		return HT;
	}

	/**
	 * @internal
	 */
	private initHuffmanTbl(): void {
		this._ydcHashTable = this.computeHuffmanTbl(
			JpegEncoder._STD_DC_LUMINANCE_NR_CODES,
			JpegEncoder._STD_DC_LUMINANCE_VALUES
		);
		this._uVdcHashTable = this.computeHuffmanTbl(
			JpegEncoder._STD_DC_CHROMINANCE_NR_CODES,
			JpegEncoder._STD_DC_CHROMINANCE_VALUES
		);
		this._yacHashTable = this.computeHuffmanTbl(
			JpegEncoder._STD_AC_LUMINANCE_NR_CODES,
			JpegEncoder._STD_AC_LUMINANCE_VALUES
		);
		this._uVacHashTable = this.computeHuffmanTbl(
			JpegEncoder._STD_AC_CHROMINANCE_NR_CODES,
			JpegEncoder._STD_AC_CHROMINANCE_VALUES
		);
	}

	/**
	 * @internal
	 */
	private initCategoryNumber(): void {
		let nrLower = 1;
		let nrUpper = 2;
		for (let cat = 1; cat <= 15; cat++) {
			// Positive numbers
			for (let nr = nrLower; nr < nrUpper; nr++) {
				this._category[32767 + nr] = cat;
				this._bitCode[32767 + nr] = [];
				this._bitCode[32767 + nr][1] = cat;
				this._bitCode[32767 + nr][0] = nr;
			}
			// Negative numbers
			for (let nrNeg = -(nrUpper - 1); nrNeg <= -nrLower; nrNeg++) {
				this._category[32767 + nrNeg] = cat;
				this._bitCode[32767 + nrNeg] = [];
				this._bitCode[32767 + nrNeg][1] = cat;
				this._bitCode[32767 + nrNeg][0] = nrUpper - 1 + nrNeg;
			}
			nrLower <<= 1;
			nrUpper <<= 1;
		}
	}

	/**
	 * @internal
	 */
	private initRGBYUVTable(): void {
		for (let i = 0; i < 256; i++) {
			this._rgbYuvTable[i] = 19595 * i;
			this._rgbYuvTable[Math.trunc(i + 256)] = 38470 * i;
			this._rgbYuvTable[Math.trunc(i + 512)] = 7471 * i + 0x8000;
			this._rgbYuvTable[Math.trunc(i + 768)] = -11059 * i;
			this._rgbYuvTable[Math.trunc(i + 1024)] = -21709 * i;
			this._rgbYuvTable[Math.trunc(i + 1280)] = 32768 * i + 0x807fff;
			this._rgbYuvTable[Math.trunc(i + 1536)] = -27439 * i;
			this._rgbYuvTable[Math.trunc(i + 1792)] = -5329 * i;
		}
	}

	/**
	 * @internal
	 */
	private writeBits(bs: number[]): void {
		const value = bs[0];
		let posVal = bs[1] - 1;
		while (posVal >= 0) {
			if (value & (1 << posVal)) {
				this._byteNew |= 1 << this._bytePos;
			}
			posVal--;
			this._bytePos--;
			if (this._bytePos < 0) {
				if (this._byteNew === 0xff) {
					this.writeByte(0xff);
					this.writeByte(0);
				} else {
					this.writeByte(this._byteNew);
				}
				this._bytePos = 7;
				this._byteNew = 0;
			}
		}
	}

	/**
	 * @internal
	 */
	private writeByte(value: number): void {
		this._byteOut.push(value);
	}

	/**
	 * @internal
	 */
	private writeWord(value: number): void {
		this.writeByte((value >> 8) & 0xff);
		this.writeByte(value & 0xff);
	}

	/**
	 * @internal
	 */
	private fDCTQuant(data: number[], fdTbl: number[]): number[] {
		let d0;
		let d1;
		let d2;
		let d3;
		let d4;
		let d5;
		let d6;
		let d7;
		/* Pass 1: process rows. */
		let dataOff = 0;
		let i;
		const I8 = 8;
		const I64 = 64;
		for (i = 0; i < I8; ++i) {
			d0 = data[dataOff];
			d1 = data[dataOff + 1];
			d2 = data[dataOff + 2];
			d3 = data[dataOff + 3];
			d4 = data[dataOff + 4];
			d5 = data[dataOff + 5];
			d6 = data[dataOff + 6];
			d7 = data[dataOff + 7];

			const tmp0 = d0 + d7;
			const tmp7 = d0 - d7;
			const tmp1 = d1 + d6;
			const tmp6 = d1 - d6;
			const tmp2 = d2 + d5;
			const tmp5 = d2 - d5;
			const tmp3 = d3 + d4;
			const tmp4 = d3 - d4;

			/* Even part */
			let tmp10 = tmp0 + tmp3; /* phase 2 */
			const tmp13 = tmp0 - tmp3;
			let tmp11 = tmp1 + tmp2;
			let tmp12 = tmp1 - tmp2;

			data[dataOff] = tmp10 + tmp11; /* phase 3 */
			data[dataOff + 4] = tmp10 - tmp11;

			const z1 = (tmp12 + tmp13) * 0.707106781; /* c4 */
			data[dataOff + 2] = tmp13 + z1; /* phase 5 */
			data[dataOff + 6] = tmp13 - z1;

			/* Odd part */
			tmp10 = tmp4 + tmp5; /* phase 2 */
			tmp11 = tmp5 + tmp6;
			tmp12 = tmp6 + tmp7;

			/* The rotator is modified from fig 4-8 to avoid extra negations. */
			const z5 = (tmp10 - tmp12) * 0.382683433; /* c6 */
			const z2 = 0.5411961 * tmp10 + z5; /* c2-c6 */
			const z4 = 1.306562965 * tmp12 + z5; /* c2+c6 */
			const z3 = tmp11 * 0.707106781; /* c4 */

			const z11 = tmp7 + z3; /* phase 5 */
			const z13 = tmp7 - z3;

			data[dataOff + 5] = z13 + z2; /* phase 6 */
			data[dataOff + 3] = z13 - z2;
			data[dataOff + 1] = z11 + z4;
			data[dataOff + 7] = z11 - z4;

			dataOff += 8; /* advance pointer to next row */
		}

		/* Pass 2: process columns. */
		dataOff = 0;
		for (i = 0; i < I8; ++i) {
			d0 = data[dataOff];
			d1 = data[dataOff + 8];
			d2 = data[dataOff + 16];
			d3 = data[dataOff + 24];
			d4 = data[dataOff + 32];
			d5 = data[dataOff + 40];
			d6 = data[dataOff + 48];
			d7 = data[dataOff + 56];

			const tmp0p2 = d0 + d7;
			const tmp7p2 = d0 - d7;
			const tmp1p2 = d1 + d6;
			const tmp6p2 = d1 - d6;
			const tmp2p2 = d2 + d5;
			const tmp5p2 = d2 - d5;
			const tmp3p2 = d3 + d4;
			const tmp4p2 = d3 - d4;

			/* Even part */
			let tmp10p2 = tmp0p2 + tmp3p2; /* phase 2 */
			const tmp13p2 = tmp0p2 - tmp3p2;
			let tmp11p2 = tmp1p2 + tmp2p2;
			let tmp12p2 = tmp1p2 - tmp2p2;

			data[dataOff] = tmp10p2 + tmp11p2; /* phase 3 */
			data[dataOff + 32] = tmp10p2 - tmp11p2;

			const z1p2 = (tmp12p2 + tmp13p2) * 0.707106781; /* c4 */
			data[dataOff + 16] = tmp13p2 + z1p2; /* phase 5 */
			data[dataOff + 48] = tmp13p2 - z1p2;

			/* Odd part */
			tmp10p2 = tmp4p2 + tmp5p2; /* phase 2 */
			tmp11p2 = tmp5p2 + tmp6p2;
			tmp12p2 = tmp6p2 + tmp7p2;

			/* The rotator is modified from fig 4-8 to avoid extra negations. */
			const z5p2 = (tmp10p2 - tmp12p2) * 0.382683433; /* c6 */
			const z2p2 = 0.5411961 * tmp10p2 + z5p2; /* c2-c6 */
			const z4p2 = 1.306562965 * tmp12p2 + z5p2; /* c2+c6 */
			const z3p2 = tmp11p2 * 0.707106781; /* c4 */

			const z11p2 = tmp7p2 + z3p2; /* phase 5 */
			const z13p2 = tmp7p2 - z3p2;

			data[dataOff + 40] = z13p2 + z2p2; /* phase 6 */
			data[dataOff + 24] = z13p2 - z2p2;
			data[dataOff + 8] = z11p2 + z4p2;
			data[dataOff + 56] = z11p2 - z4p2;

			dataOff++; /* advance pointer to next column */
		}

		// Quantize/descale the coefficients
		let fDCTQuant;
		for (i = 0; i < I64; ++i) {
			// Apply the quantization and scaling factor & Round to nearest integer
			fDCTQuant = data[i] * fdTbl[i];
			this._outputFDctQuant[i] =
				fDCTQuant > 0 ? Math.trunc(fDCTQuant + 0.5) : Math.trunc(fDCTQuant - 0.5);
		}
		return this._outputFDctQuant;
	}

	/**
	 * @internal
	 */
	private writeAPP0(): void {
		this.writeWord(0xffe0); // marker
		this.writeWord(16); // length
		this.writeByte(0x4a); // J
		this.writeByte(0x46); // F
		this.writeByte(0x49); // I
		this.writeByte(0x46); // F
		// cspell:disable-next-line
		this.writeByte(0); // = "JFIF",'\0'
		this.writeByte(1); // version hi
		this.writeByte(1); // version lo
		this.writeByte(0); // xy units
		this.writeWord(1); // x density
		this.writeWord(1); // y density
		this.writeByte(0); // thumb n width
		this.writeByte(0); // thumb n height
	}

	/**
	 * @internal
	 */
	private writeSOF0(width: number, height: number): void {
		this.writeWord(0xffc0); // marker
		this.writeWord(17); // length, true color YUV JPG
		this.writeByte(8); // precision
		this.writeWord(height);
		this.writeWord(width);
		this.writeByte(3); // nr of components
		this.writeByte(1); // IdY
		this.writeByte(0x11); // HVY
		this.writeByte(0); // QTY
		this.writeByte(2); // IdU
		this.writeByte(0x11); // HVU
		this.writeByte(1); // QTU
		this.writeByte(3); // IdV
		this.writeByte(0x11); // HVV
		this.writeByte(1); // QTV
	}

	/**
	 * @internal
	 */
	private writeDQT(): void {
		this.writeWord(0xffdb); // marker
		this.writeWord(132); // length
		this.writeByte(0);
		for (let i = 0; i < 64; i++) {
			this.writeByte(this._yTable[i]);
		}
		this.writeByte(1);
		for (let j = 0; j < 64; j++) {
			this.writeByte(this._uvTable[j]);
		}
	}

	/**
	 * @internal
	 */
	private writeDHT(): void {
		this.writeWord(0xffc4); // marker
		this.writeWord(0x01a2); // length

		this.writeByte(0); // HTYDc info
		for (let i = 0; i < 16; i++) {
			this.writeByte(JpegEncoder._STD_DC_LUMINANCE_NR_CODES[i + 1]);
		}
		for (let j = 0; j <= 11; j++) {
			this.writeByte(JpegEncoder._STD_DC_LUMINANCE_VALUES[j]);
		}

		this.writeByte(0x10); // HTYAc info
		for (let k = 0; k < 16; k++) {
			this.writeByte(JpegEncoder._STD_AC_LUMINANCE_NR_CODES[k + 1]);
		}
		for (let l = 0; l <= 161; l++) {
			this.writeByte(JpegEncoder._STD_AC_LUMINANCE_VALUES[l]);
		}

		this.writeByte(1); // HTUDc info
		for (let m = 0; m < 16; m++) {
			this.writeByte(JpegEncoder._STD_DC_CHROMINANCE_NR_CODES[m + 1]);
		}
		for (let n = 0; n <= 11; n++) {
			this.writeByte(JpegEncoder._STD_DC_CHROMINANCE_VALUES[n]);
		}

		this.writeByte(0x11); // HTUAc info
		for (let o = 0; o < 16; o++) {
			this.writeByte(JpegEncoder._STD_AC_CHROMINANCE_NR_CODES[o + 1]);
		}
		for (let p = 0; p <= 161; p++) {
			this.writeByte(JpegEncoder._STD_AC_CHROMINANCE_VALUES[p]);
		}
	}

	/**
	 * @internal
	 */
	private writeSOS(): void {
		this.writeWord(0xffda); // marker
		this.writeWord(12); // length
		this.writeByte(3); // nr of components
		this.writeByte(1); // IdY
		this.writeByte(0); // HTY
		this.writeByte(2); // IdU
		this.writeByte(0x11); // HTU
		this.writeByte(3); // IdV
		this.writeByte(0x11); // HTV
		this.writeByte(0); // Ss
		this.writeByte(0x3f); // Se
		this.writeByte(0); // Bf
	}

	/**
	 * @internal
	 */
	private processDU(
		CDU: number[],
		fdTbl: number[],
		passedDC: number,
		HTDc: number[][],
		HTAc: number[][]
	): number {
		let DC = passedDC;
		const EOB = HTAc[0x00];
		const m16zeroes = HTAc[0xf0];
		let pos;
		const I16 = 16;
		const I63 = 63;
		const I64 = 64;
		const DU_DCT = this.fDCTQuant(CDU, fdTbl);
		// ZigZag reorder
		for (let j = 0; j < I64; ++j) {
			this._du[JpegEncoder._SIG_ZAG[j]] = DU_DCT[j];
		}
		const diff = this._du[0] - DC;
		DC = this._du[0];
		// Encode DC
		if (diff === 0) {
			this.writeBits(HTDc[0]); // Diff might be 0
		} else {
			pos = 32767 + diff;
			this.writeBits(HTDc[this._category[pos]]);
			this.writeBits(this._bitCode[pos]);
		}
		// Encode ACs
		let end0pos = 63; // was const... which is crazy
		for (; end0pos > 0 && this._du[end0pos] === 0; end0pos--) {}
		// end0pos = first element in reverse order !=0
		if (end0pos === 0) {
			this.writeBits(EOB);
			return DC;
		}
		let i = 1;
		let lng;
		while (i <= end0pos) {
			const startPos = i;
			for (; this._du[i] === 0 && i <= end0pos; ++i) {}
			let nrZeroes = i - startPos;
			if (nrZeroes >= I16) {
				lng = nrZeroes >> 4;
				for (let nrMarker = 1; nrMarker <= lng; ++nrMarker) {
					this.writeBits(m16zeroes);
				}
				nrZeroes &= 0xf;
			}
			pos = 32767 + this._du[i];
			this.writeBits(HTAc[(nrZeroes << 4) + this._category[pos]]);
			this.writeBits(this._bitCode[pos]);
			i++;
		}
		if (end0pos !== I63) {
			this.writeBits(EOB);
		}
		return DC;
	}
}
