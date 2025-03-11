// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { GeneralError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { MathHelper } from "./mathHelper";
import { Polynomial } from "./polynomial";
import { ErrorCorrectLevel } from "../models/errorCorrectLevel";
import { MaskPattern } from "../models/maskPattern";
import { QRDataMode } from "../models/qrDataMode";

/**
 * Helper methods for QR generation.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class QRHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<QRHelper>();

	/**
	 * @internal
	 */
	private static readonly _PATTERN_POSITION_TABLE: number[][] = [
		[],
		[6, 18],
		[6, 22],
		[6, 26],
		[6, 30],
		[6, 34],
		[6, 22, 38],
		[6, 24, 42],
		[6, 26, 46],
		[6, 28, 50],
		[6, 30, 54],
		[6, 32, 58],
		[6, 34, 62],
		[6, 26, 46, 66],
		[6, 26, 48, 70],
		[6, 26, 50, 74],
		[6, 30, 54, 78],
		[6, 30, 56, 82],
		[6, 30, 58, 86],
		[6, 34, 62, 90],
		[6, 28, 50, 72, 94],
		[6, 26, 50, 74, 98],
		[6, 30, 54, 78, 102],
		[6, 28, 54, 80, 106],
		[6, 32, 58, 84, 110],
		[6, 30, 58, 86, 114],
		[6, 34, 62, 90, 118],
		[6, 26, 50, 74, 98, 122],
		[6, 30, 54, 78, 102, 126],
		[6, 26, 52, 78, 104, 130],
		[6, 30, 56, 82, 108, 134],
		[6, 34, 60, 86, 112, 138],
		[6, 30, 58, 86, 114, 142],
		[6, 34, 62, 90, 118, 146],
		[6, 30, 54, 78, 102, 126, 150],
		[6, 24, 50, 76, 102, 128, 154],
		[6, 28, 54, 80, 106, 132, 158],
		[6, 32, 58, 84, 110, 136, 162],
		[6, 26, 54, 82, 110, 138, 166],
		[6, 30, 58, 86, 114, 142, 170]
	];

	/**
	 * @internal
	 */
	private static readonly _MAX_LENGTH: number[][][] = [
		[
			[41, 25, 17, 10],
			[34, 20, 14, 8],
			[27, 16, 11, 7],
			[17, 10, 7, 4]
		],
		[
			[77, 47, 32, 20],
			[63, 38, 26, 16],
			[48, 29, 20, 12],
			[34, 20, 14, 8]
		],
		[
			[127, 77, 53, 32],
			[101, 61, 42, 26],
			[77, 47, 32, 20],
			[58, 35, 24, 15]
		],
		[
			[187, 114, 78, 48],
			[149, 90, 62, 38],
			[111, 67, 46, 28],
			[82, 50, 34, 21]
		],
		[
			[255, 154, 106, 65],
			[202, 122, 84, 52],
			[144, 87, 60, 37],
			[106, 64, 44, 27]
		],
		[
			[322, 195, 134, 82],
			[255, 154, 106, 65],
			[178, 108, 74, 45],
			[139, 84, 58, 36]
		],
		[
			[370, 224, 154, 95],
			[293, 178, 122, 75],
			[207, 125, 86, 53],
			[154, 93, 64, 39]
		],
		[
			[461, 279, 192, 118],
			[365, 221, 152, 93],
			[259, 157, 108, 66],
			[202, 122, 84, 52]
		],
		[
			[552, 335, 230, 141],
			[432, 262, 180, 111],
			[312, 189, 130, 80],
			[235, 143, 98, 60]
		],
		[
			[652, 395, 271, 167],
			[513, 311, 213, 131],
			[364, 221, 151, 93],
			[288, 174, 119, 74]
		]
	];

	/**
	 * @internal
	 */
	private static readonly _G15: number =
		(1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);

	/**
	 * @internal
	 */
	private static readonly _G18: number =
		(1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);

	/**
	 * @internal
	 */
	private static readonly _G15_MASK: number =
		(1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

	/**
	 * Get the pattern position for the given type number.
	 * @param typeNumber The type number to get the pattern for.
	 * @returns The pattern for the type number.
	 */
	public static getPatternPosition(typeNumber: number): number[] {
		return QRHelper._PATTERN_POSITION_TABLE[typeNumber - 1];
	}

	/**
	 * Get the max length of the data.
	 * @param typeNumber The type number to get the max length for.
	 * @param mode The data mode to get data max length for.
	 * @param errorCorrectLevel The error correction to get the max length for.
	 * @returns The max length.
	 * @throws Error with unknown correction level.
	 */
	public static getMaxLength(
		typeNumber: number,
		mode: QRDataMode,
		errorCorrectLevel: ErrorCorrectLevel
	): number {
		const t = typeNumber - 1;
		let e;
		let m;

		switch (errorCorrectLevel) {
			case ErrorCorrectLevel.L:
				e = 0;
				break;
			case ErrorCorrectLevel.M:
				e = 1;
				break;
			case ErrorCorrectLevel.Q:
				e = 2;
				break;
			case ErrorCorrectLevel.H:
				e = 3;
				break;
			default:
				throw new GeneralError(QRHelper._CLASS_NAME, "correctionLevelRange", { errorCorrectLevel });
		}

		switch (mode) {
			case QRDataMode.Number:
				m = 0;
				break;
			case QRDataMode.AlphaNumeric:
				m = 1;
				break;
			case QRDataMode.Byte8:
				m = 2;
				break;
			default:
				throw new GeneralError(QRHelper._CLASS_NAME, "modeRange", { mode });
		}

		return QRHelper._MAX_LENGTH[t][e][m];
	}

	/**
	 * Get the error correction polynomial for the error correct to length.
	 * @param errorCorrectLength The error correction length to get the polynomial for.
	 * @returns The polynomial for the error correction length.
	 */
	public static getErrorCorrectPolynomial(errorCorrectLength: number): Polynomial {
		let a = new Polynomial([1]);

		for (let i = 0; i < errorCorrectLength; i++) {
			a = a.multiply(new Polynomial([1, MathHelper.gExp(i)]));
		}

		return a;
	}

	/**
	 * Get the mask method for the given pattern.
	 * @param maskPattern The pattern to get the mask for.
	 * @returns The mask method for the pattern.
	 * @throws Error with invalid mask.
	 */
	public static getMaskMethod(maskPattern: number): (i: number, j: number) => boolean {
		switch (maskPattern) {
			case MaskPattern.PATTERN000:
				return (i: number, j: number) => (i + j) % 2 === 0;
			case MaskPattern.PATTERN001:
				return (i: number, j: number) => i % 2 === 0;
			case MaskPattern.PATTERN010:
				return (i: number, j: number) => j % 3 === 0;
			case MaskPattern.PATTERN011:
				return (i: number, j: number) => (i + j) % 3 === 0;
			case MaskPattern.PATTERN100:
				return (i: number, j: number) => (~~(i / 2) + ~~(j / 3)) % 2 === 0;
			case MaskPattern.PATTERN101:
				return (i: number, j: number) => ((i * j) % 2) + ((i * j) % 3) === 0;
			case MaskPattern.PATTERN110:
				return (i: number, j: number) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
			case MaskPattern.PATTERN111:
				return (i: number, j: number) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;

			default:
				throw new GeneralError(QRHelper._CLASS_NAME, "maskPatternRange", { maskPattern });
		}
	}

	/**
	 * Get the BCH type info.
	 * @param data The data to get the BCH type info for.
	 * @returns The type info.
	 */
	public static getBCHTypeInfo(data: number): number {
		let d = data << 10;
		while (QRHelper.getBCHDigit(d) - QRHelper.getBCHDigit(QRHelper._G15) >= 0) {
			d ^= QRHelper._G15 << (QRHelper.getBCHDigit(d) - QRHelper.getBCHDigit(QRHelper._G15));
		}
		return ((data << 10) | d) ^ QRHelper._G15_MASK;
	}

	/**
	 * Get the BCH type number.
	 * @param data The data to get the BCH type number for.
	 * @returns The type number.
	 */
	public static getBCHTypeNumber(data: number): number {
		let d = data << 12;
		while (QRHelper.getBCHDigit(d) - QRHelper.getBCHDigit(QRHelper._G18) >= 0) {
			d ^= QRHelper._G18 << (QRHelper.getBCHDigit(d) - QRHelper.getBCHDigit(QRHelper._G18));
		}
		return (data << 12) | d;
	}

	/**
	 * @internal
	 */
	private static getBCHDigit(data: number): number {
		let localData = data;
		let digit = 0;
		while (localData !== 0) {
			digit++;
			localData >>>= 1;
		}
		return digit;
	}
}
