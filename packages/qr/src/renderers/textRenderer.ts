// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import type { IRendererOptions } from "../models/IRendererOptions";
import type { ITextRendererOptions } from "../models/ITextRendererOptions";
import type { QRCellData } from "../models/qrCellData";

/**
 * Class to render qr data as text.
 */
export class TextRenderer {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<TextRenderer>();

	/**
	 * Render the QR code data as text.
	 * @param cellData The cell data for the QR code.
	 * @param options The options for rendering.
	 * @returns The text content.
	 */
	public static async render(
		cellData: QRCellData,
		options?: ITextRendererOptions
	): Promise<string> {
		Guards.array(TextRenderer._CLASS_NAME, nameof(cellData), cellData);

		options = options ?? {};
		options.cellSize = options.cellSize ?? 1;
		options.marginSize = options.marginSize ?? 2;

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

		options.onChar = options.onChar ?? "██";
		options.offChar = options.offChar ?? "  ";

		const marginSize = options?.marginSize;
		const cellSize = options?.cellSize;

		let text = "";
		for (let m = 0; m < marginSize; m++) {
			text += `${options.offChar.repeat(cellSize * cellData.length)}\r\n`;
		}
		for (let x = 0; x < cellData.length; x++) {
			let line = options.offChar.repeat(marginSize);
			for (let y = 0; y < cellData[x].length; y++) {
				if (cellData[y][x]) {
					line += options.onChar.repeat(cellSize);
				} else {
					line += options.offChar.repeat(cellSize);
				}
			}
			line += options.offChar.repeat(marginSize);
			line += "\r\n";

			for (let c = 0; c < cellSize; c++) {
				text += line;
			}
		}
		for (let m = 0; m < marginSize; m++) {
			text += `${options.offChar.repeat(cellSize * cellData.length)}\r\n`;
		}
		return text;
	}
}
