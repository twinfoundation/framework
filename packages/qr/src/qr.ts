// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
/* eslint-disable no-mixed-operators */
/* eslint-disable unicorn/prefer-math-trunc */
import { GeneralError, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { QRAlphaNumeric } from "./data/qrAlphaNumeric";
import { QRByte8 } from "./data/qrByte8";
import { QRNumber } from "./data/qrNumber";
import { BitBuffer } from "./helpers/bitBuffer";
import { MathHelper } from "./helpers/mathHelper";
import { Polynomial } from "./helpers/polynomial";
import { QRHelper } from "./helpers/qrHelper";
import { RSBlock } from "./helpers/rsBlock";
import { ErrorCorrectLevel } from "./models/errorCorrectLevel";
import type { QRCellData } from "./models/qrCellData";
import type { QRDataBase } from "./models/qrDataBase";

/**
 * Class to generates QR codes from data.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export class QR {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<QR>();

	/**
	 * @internal
	 */
	private static readonly _PAD0: number = 0xec;

	/**
	 * @internal
	 */
	private static readonly _PAD1: number = 0x11;

	/**
	 * @internal
	 */
	private _typeNumber: number;

	/**
	 * @internal
	 */
	private readonly _errorCorrectLevel: ErrorCorrectLevel;

	/**
	 * @internal
	 */
	private readonly _qrData: QRDataBase[];

	/**
	 * @internal
	 */
	private _modules: QRCellData;

	/**
	 * @internal
	 */
	private _moduleCount: number;

	/**
	 * Create a new instance of QR.
	 * @param typeNumber 0 to 40, 0 means autodetect.
	 * @param errorCorrectLevel 'L','M','Q','H'.
	 * @throws Error if the typeNumber is invalid.
	 */
	constructor(typeNumber: number = 6, errorCorrectLevel: ErrorCorrectLevel = ErrorCorrectLevel.L) {
		if (!Is.integer(typeNumber) || typeNumber < 0 || typeNumber > 40) {
			throw new GeneralError(QR._CLASS_NAME, "typeNumberRange", { typeNumber });
		}
		this._typeNumber = typeNumber;
		this._errorCorrectLevel = errorCorrectLevel;
		this._qrData = [];
		this._moduleCount = 0;
		this._modules = [];

		MathHelper.initialize();
	}

	/**
	 * Add text data to the QR Code.
	 * @param qrData The data to add.
	 */
	public addText(qrData: string): void {
		this._qrData.push(new QRByte8(qrData));
	}

	/**
	 * Add number to the QR Code.
	 * @param qrData The data to add.
	 */
	public addNumber(qrData: string): void {
		this._qrData.push(new QRNumber(qrData));
	}

	/**
	 * Add alpha numeric to the QR Code.
	 * @param qrData The data to add.
	 */
	public addAlphaNumeric(qrData: string): void {
		this._qrData.push(new QRAlphaNumeric(qrData));
	}

	/**
	 * Generate the display buffer.
	 * @returns Boolean buffer of pixels.
	 */
	public generate(): QRCellData {
		this.autoDetectTypeNumber();

		this.makeImpl(false, this.getBestMaskPattern());

		const pixels: QRCellData = [];
		for (let y = 0; y < this._moduleCount; y++) {
			for (let x = 0; x < this._moduleCount; x++) {
				pixels[x] = pixels[x] || [];
				pixels[x][y] = this.isDark(y, x);
			}
		}
		return pixels;
	}

	/**
	 * @internal
	 */
	private isDark(row: number, col: number): boolean | null {
		if (this._modules[row][col] !== null) {
			return this._modules[row][col];
		}
		return false;
	}

	/**
	 * @internal
	 */
	private getBestMaskPattern(): number {
		let minLostPoint = 0;
		let pattern = 0;

		for (let i = 0; i < 8; i++) {
			this.makeImpl(true, i);

			const lostPoint = this.getLostPoint();

			if (i === 0 || minLostPoint > lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}

		return pattern;
	}

	/**
	 * @internal
	 */
	private makeImpl(test: boolean, maskPattern: number): void {
		this._moduleCount = this._typeNumber * 4 + 17;
		this._modules = [];
		for (let i = 0; i < this._moduleCount; i++) {
			this._modules.push([]);
			for (let j = 0; j < this._moduleCount; j++) {
				this._modules[i].push(null);
			}
		}

		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this._moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this._moduleCount - 7);

		this.setupPositionAdjustPattern();
		this.setupTimingPattern();

		this.setupTypeInfo(test, maskPattern);

		if (this._typeNumber >= 7) {
			this.setupTypeNumber(test);
		}

		const data = this.createData();

		this.mapData(data, maskPattern);
	}

	/**
	 * @internal
	 */
	private mapData(data: number[], maskPattern: number): void {
		let inc = -1;
		let row = this._moduleCount - 1;
		let bitIndex = 7;
		let byteIndex = 0;
		const maskFunc = QRHelper.getMaskMethod(maskPattern);

		for (let col = this._moduleCount - 1; col > 0; col -= 2) {
			if (col === 6) {
				col -= 1;
			}

			let flag = true;
			while (flag) {
				for (let c = 0; c < 2; c++) {
					if (this._modules[row][col - c] === null) {
						let dark = false;

						if (byteIndex < data.length) {
							dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
						}

						const mask = maskFunc(row, col - c);

						if (mask) {
							dark = !dark;
						}

						this._modules[row][col - c] = dark;
						bitIndex -= 1;

						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}

				row += inc;

				if (row < 0 || this._moduleCount <= row) {
					row -= inc;
					inc = -inc;
					flag = false;
				}
			}
		}
	}

	/**
	 * @internal
	 */
	private setupPositionAdjustPattern(): void {
		const pos = QRHelper.getPatternPosition(this._typeNumber);

		for (let i = 0; i < pos.length; i++) {
			for (let j = 0; j < pos.length; j++) {
				const row = pos[i];
				const col = pos[j];

				if (this._modules[row][col] !== null) {
					continue;
				}

				for (let r = -2; r <= 2; r++) {
					for (let c = -2; c <= 2; c++) {
						if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
							this._modules[row + r][col + c] = true;
						} else {
							this._modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	}

	/**
	 * @internal
	 */
	private setupPositionProbePattern(row: number, col: number): void {
		for (let r = -1; r <= 7; r++) {
			for (let c = -1; c <= 7; c++) {
				if (
					row + r <= -1 ||
					this._moduleCount <= row + r ||
					col + c <= -1 ||
					this._moduleCount <= col + c
				) {
					continue;
				}

				if (
					(r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
					(c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
					(r >= 2 && r <= 4 && c >= 2 && c <= 4)
				) {
					this._modules[row + r][col + c] = true;
				} else {
					this._modules[row + r][col + c] = false;
				}
			}
		}
	}

	/**
	 * @internal
	 */
	private setupTimingPattern(): void {
		for (let r = 8; r < this._moduleCount - 8; r++) {
			if (this._modules[r][6] !== null) {
				continue;
			}
			this._modules[r][6] = r % 2 === 0;
		}
		for (let c = 8; c < this._moduleCount - 8; c++) {
			if (this._modules[6][c] !== null) {
				continue;
			}
			this._modules[6][c] = c % 2 === 0;
		}
	}

	/**
	 * @internal
	 */
	private setupTypeNumber(test: boolean): void {
		const bits = QRHelper.getBCHTypeNumber(this._typeNumber);

		for (let i = 0; i < 18; i++) {
			this._modules[~~(i / 3)][(i % 3) + this._moduleCount - 8 - 3] =
				!test && ((bits >> i) & 1) === 1;
		}

		for (let i = 0; i < 18; i++) {
			this._modules[(i % 3) + this._moduleCount - 8 - 3][~~(i / 3)] =
				!test && ((bits >> i) & 1) === 1;
		}
	}

	/**
	 * @internal
	 */
	private setupTypeInfo(test: boolean, maskPattern: number): void {
		const data = (this._errorCorrectLevel << 3) | maskPattern;
		const bits = QRHelper.getBCHTypeInfo(data);

		// vertical
		for (let i = 0; i < 15; i++) {
			const mod = !test && ((bits >> i) & 1) === 1;

			if (i < 6) {
				this._modules[i][8] = mod;
			} else if (i < 8) {
				this._modules[i + 1][8] = mod;
			} else {
				this._modules[this._moduleCount - 15 + i][8] = mod;
			}
		}

		// horizontal
		for (let i = 0; i < 15; i++) {
			const mod = !test && ((bits >> i) & 1) === 1;

			if (i < 8) {
				this._modules[8][this._moduleCount - i - 1] = mod;
			} else if (i < 9) {
				this._modules[8][15 - i - 1 + 1] = mod;
			} else {
				this._modules[8][15 - i - 1] = mod;
			}
		}

		// fixed
		this._modules[this._moduleCount - 8][8] = !test;
	}

	/**
	 * @internal
	 */
	private getLostPoint(): number {
		const moduleCount = this._moduleCount;

		let lostPoint = 0;

		// LEVEL1

		for (let row = 0; row < moduleCount; row++) {
			for (let col = 0; col < moduleCount; col++) {
				let sameCount = 0;
				const dark = this.isDark(row, col);

				for (let r = -1; r <= 1; r++) {
					if (row + r < 0 || moduleCount <= row + r) {
						continue;
					}

					for (let c = -1; c <= 1; c++) {
						if (col + c < 0 || moduleCount <= col + c) {
							continue;
						}

						if (r === 0 && c === 0) {
							continue;
						}

						if (dark === this.isDark(row + r, col + c)) {
							sameCount++;
						}
					}
				}

				if (sameCount > 5) {
					lostPoint += 3 + sameCount - 5;
				}
			}
		}

		// LEVEL2

		for (let row = 0; row < moduleCount - 1; row++) {
			for (let col = 0; col < moduleCount - 1; col++) {
				let count = 0;
				if (this.isDark(row, col)) {
					count++;
				}
				if (this.isDark(row + 1, col)) {
					count++;
				}
				if (this.isDark(row, col + 1)) {
					count++;
				}
				if (this.isDark(row + 1, col + 1)) {
					count++;
				}
				if (count === 0 || count === 4) {
					lostPoint += 3;
				}
			}
		}

		// LEVEL3

		for (let row = 0; row < moduleCount; row++) {
			for (let col = 0; col < moduleCount - 6; col++) {
				if (
					this.isDark(row, col) &&
					!this.isDark(row, col + 1) &&
					this.isDark(row, col + 2) &&
					this.isDark(row, col + 3) &&
					this.isDark(row, col + 4) &&
					!this.isDark(row, col + 5) &&
					this.isDark(row, col + 6)
				) {
					lostPoint += 40;
				}
			}
		}

		for (let col = 0; col < moduleCount; col++) {
			for (let row = 0; row < moduleCount - 6; row++) {
				if (
					this.isDark(row, col) &&
					!this.isDark(row + 1, col) &&
					this.isDark(row + 2, col) &&
					this.isDark(row + 3, col) &&
					this.isDark(row + 4, col) &&
					!this.isDark(row + 5, col) &&
					this.isDark(row + 6, col)
				) {
					lostPoint += 40;
				}
			}
		}

		// LEVEL4

		let darkCount = 0;

		for (let col = 0; col < moduleCount; col++) {
			for (let row = 0; row < moduleCount; row++) {
				if (this.isDark(row, col)) {
					darkCount++;
				}
			}
		}

		const ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
		lostPoint += ratio * 10;

		return lostPoint;
	}

	/**
	 * @internal
	 */
	private createData(): number[] {
		const rsBlocks: RSBlock[] = RSBlock.getRSBlocks(this._typeNumber, this._errorCorrectLevel);

		const buffer = new BitBuffer();

		for (let i = 0; i < this._qrData.length; i++) {
			const data = this._qrData[i];
			buffer.put(data.getMode(), 4);
			buffer.put(data.getLength(), data.getLengthInBits(this._typeNumber));
			data.write(buffer);
		}

		// calc max data count
		let totalDataCount = 0;
		for (let i = 0; i < rsBlocks.length; i++) {
			totalDataCount += rsBlocks[i].getDataCount();
		}

		if (buffer.getLengthInBits() > totalDataCount * 8) {
			throw new GeneralError(QR._CLASS_NAME, "dataOverflow", {
				lengthInBits: buffer.getLengthInBits(),
				totalDataCount,
				typeNumber: this._typeNumber
			});
		}

		// end
		if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
			buffer.put(0, 4);
		}

		// padding
		while (buffer.getLengthInBits() % 8 !== 0) {
			buffer.putBit(false);
		}

		// padding
		let flag = true;
		while (flag) {
			if (buffer.getLengthInBits() >= totalDataCount * 8) {
				break;
			}
			buffer.put(QR._PAD0, 8);

			if (buffer.getLengthInBits() >= totalDataCount * 8) {
				flag = false;
			} else {
				buffer.put(QR._PAD1, 8);
			}
		}

		return this.createBytes(buffer, rsBlocks);
	}

	/**
	 * @internal
	 */
	private createBytes(buffer: BitBuffer, rsBlocks: RSBlock[]): number[] {
		let offset = 0;

		let maxDcCount = 0;
		let maxEcCount = 0;

		const dcData: number[][] = [];
		const ecData: number[][] = [];

		for (let r = 0; r < rsBlocks.length; r++) {
			dcData.push([]);
			ecData.push([]);
		}

		for (let r = 0; r < rsBlocks.length; r++) {
			const dcCount = rsBlocks[r].getDataCount();
			const ecCount = rsBlocks[r].getTotalCount() - dcCount;

			maxDcCount = Math.max(maxDcCount, dcCount);
			maxEcCount = Math.max(maxEcCount, ecCount);

			dcData[r] = this.createNumArray(dcCount);
			for (let i = 0; i < dcData[r].length; i++) {
				dcData[r][i] = 0xff & buffer.getBuffer()[i + offset];
			}
			offset += dcCount;

			const rsPoly = QRHelper.getErrorCorrectPolynomial(ecCount);
			const rawPoly = new Polynomial(dcData[r], rsPoly.getLength() - 1);

			const modPoly = rawPoly.mod(rsPoly);
			ecData[r] = this.createNumArray(rsPoly.getLength() - 1);
			for (let i = 0; i < ecData[r].length; i++) {
				const modIndex = i + modPoly.getLength() - ecData[r].length;
				ecData[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
			}
		}

		let totalCodeCount = 0;
		for (let i = 0; i < rsBlocks.length; i++) {
			totalCodeCount += rsBlocks[i].getTotalCount();
		}

		const data = this.createNumArray(totalCodeCount);
		let index = 0;

		for (let i = 0; i < maxDcCount; i++) {
			for (let r = 0; r < rsBlocks.length; r++) {
				if (i < dcData[r].length) {
					data[index] = dcData[r][i];
					index++;
				}
			}
		}

		for (let i = 0; i < maxEcCount; i++) {
			for (let r = 0; r < rsBlocks.length; r++) {
				if (i < ecData[r].length) {
					data[index] = ecData[r][i];
					index++;
				}
			}
		}
		return data;
	}

	/**
	 * @internal
	 */
	private createNumArray(len: number): number[] {
		const a: number[] = [];
		for (let i = 0; i < len; i++) {
			a.push(0);
		}
		return a;
	}

	/**
	 * @internal
	 */
	private autoDetectTypeNumber(): void {
		if (this._typeNumber === 0) {
			for (let typeNumber = 1; typeNumber <= 40; typeNumber++) {
				const rsBlocks = RSBlock.getRSBlocks(typeNumber, this._errorCorrectLevel);
				const buffer = new BitBuffer();

				for (let i = 0; i < this._qrData.length; i++) {
					const data = this._qrData[i];
					buffer.put(data.getMode(), 4);
					buffer.put(data.getLength(), data.getLengthInBits(typeNumber));
					data.write(buffer);
				}

				let totalDataCount = 0;
				for (let i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].getDataCount();
				}

				if (buffer.getLengthInBits() <= totalDataCount * 8) {
					this._typeNumber = typeNumber;
					break;
				}

				if (typeNumber === 40) {
					throw new GeneralError(QR._CLASS_NAME, "typeNumberOverflow", {
						lengthInBits: buffer.getLengthInBits(),
						totalDataCount
					});
				}
			}
		}
	}
}
