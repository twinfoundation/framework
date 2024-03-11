// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-mixed-operators */
import { GeneralError, Guards } from "@gtsc/core";
import { Color, PngEncoder } from "@gtsc/image";
import { nameof } from "@gtsc/nameof";
import type { IBitmapRendererOptions } from "../models/IBitmapRendererOptions";
import type { IRendererOptions } from "../models/IRendererOptions";
import type { QRCellData } from "../models/qrCellData";

/**
 * Class to render qr data as png.
 */
export class PngRenderer {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<PngRenderer>();

	/**
	 * Render the QR code data as a bitmap.
	 * @param cellData The cell data for the QR code.
	 * @param options The options for rendering.
	 * @returns The bitmap content.
	 */
	public static async render(
		cellData: QRCellData,
		options?: IBitmapRendererOptions
	): Promise<Uint8Array> {
		Guards.array(PngRenderer._CLASS_NAME, nameof(cellData), cellData);

		options = options ?? {};
		options.cellSize = options.cellSize ?? 5;
		options.marginSize = options.marginSize ?? 10;

		Guards.number(nameof<IRendererOptions>(), nameof(options.cellSize), options?.cellSize);
		Guards.number(nameof<IRendererOptions>(), nameof(options.marginSize), options?.marginSize);

		if (options?.cellSize <= 0) {
			throw new GeneralError(nameof<IRendererOptions>(), "cellSizeZero", {
				cellSize: options?.cellSize
			});
		}
		if (options?.marginSize <= 0) {
			throw new GeneralError(nameof<IRendererOptions>(), "marginSizeZero", {
				marginSize: options?.marginSize
			});
		}

		const background = Color.coerce(options?.background) ?? Color.fromHex("#FFFFFF");
		const foreground = Color.coerce(options?.foreground) ?? Color.fromHex("#000000");

		const dimensions = cellData.length * options?.cellSize + 2 * options?.marginSize;

		const data = new Uint8Array(dimensions * dimensions * 4);
		for (let i = 0; i < data.length; i += 4) {
			data[i] = background.red();
			data[i + 1] = background.green();
			data[i + 2] = background.blue();
			data[i + 3] = background.alpha();
		}

		let dc = options?.marginSize * dimensions * 4;
		for (let x = 0; x < cellData.length; x++) {
			const row = new Uint8Array(dimensions * 4);
			let r = 0;

			for (let i = 0; i < options?.marginSize; i++) {
				row[r++] = background.red();
				row[r++] = background.green();
				row[r++] = background.blue();
				row[r++] = background.alpha();
			}

			for (let y = 0; y < cellData[x].length; y++) {
				const colour = cellData[y][x] ? foreground : background;
				for (let c = 0; c < options?.cellSize; c++) {
					row[r++] = colour.red();
					row[r++] = colour.green();
					row[r++] = colour.blue();
					row[r++] = colour.alpha();
				}
			}

			for (let i = 0; i < options?.marginSize; i++) {
				row[r++] = background.red();
				row[r++] = background.green();
				row[r++] = background.blue();
				row[r++] = background.alpha();
			}

			for (let c = 0; c < options?.cellSize; c++) {
				data.set(row, dc);
				dc += row.length;
			}
		}

		return new PngEncoder().encode([data.buffer], dimensions, dimensions);
	}
}
