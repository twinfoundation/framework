// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */

import { Guards, GeneralError, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Class to represent a color.
 */
export class Color {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Color>();

	/**
	 * @internal
	 */
	private readonly _alpha: number;

	/**
	 * @internal
	 */
	private readonly _red: number;

	/**
	 * @internal
	 */
	private readonly _green: number;

	/**
	 * @internal
	 */
	private readonly _blue: number;

	/**
	 * Create a new instance of color.
	 * @param alpha The alpha element of the color.
	 * @param red The red element of the color.
	 * @param green The green element of the color.
	 * @param blue The blue element of the color.
	 */
	constructor(alpha: number, red: number, green: number, blue: number) {
		Guards.number(Color._CLASS_NAME, nameof(alpha), alpha);
		Guards.number(Color._CLASS_NAME, nameof(red), red);
		Guards.number(Color._CLASS_NAME, nameof(green), green);
		Guards.number(Color._CLASS_NAME, nameof(blue), blue);

		if (alpha < 0 || alpha > 255) {
			throw new GeneralError(Color._CLASS_NAME, "range", {
				prop: nameof(alpha),
				value: alpha
			});
		}
		if (red < 0 || red > 255) {
			throw new GeneralError(Color._CLASS_NAME, "range", {
				prop: nameof(red),
				value: red
			});
		}
		if (green < 0 || green > 255) {
			throw new GeneralError(Color._CLASS_NAME, "range", {
				prop: nameof(green),
				value: green
			});
		}
		if (blue < 0 || blue > 255) {
			throw new GeneralError(Color._CLASS_NAME, "range", {
				prop: nameof(blue),
				value: blue
			});
		}

		this._alpha = alpha;
		this._red = red;
		this._green = green;
		this._blue = blue;
	}

	/**
	 * Construct a color from a hex string.
	 * @param hex The hex string to parse.
	 * @returns The color.
	 * @throws Error if the format is incorrect.
	 */
	public static fromHex(hex: string): Color {
		Guards.stringValue(Color._CLASS_NAME, nameof(hex), hex);

		let alpha;
		let red;
		let green;
		let blue;
		if (/^#[\dA-Fa-f]{3}$/.test(hex)) {
			// #RGB
			alpha = "0xFF";
			red = hex.slice(1, 2).repeat(2);
			green = hex.slice(2, 3).repeat(2);
			blue = hex.slice(3, 4).repeat(2);
		} else if (/^#[\dA-Fa-f]{4}$/.test(hex)) {
			// #ARGB
			alpha = hex.slice(1, 2).repeat(2);
			red = hex.slice(2, 3).repeat(2);
			green = hex.slice(3, 4).repeat(2);
			blue = hex.slice(4, 5).repeat(2);
		} else if (/^#[\dA-Fa-f]{6}$/.test(hex)) {
			// #RRGGBB
			alpha = "0xFF";
			red = hex.slice(1, 3);
			green = hex.slice(3, 5);
			blue = hex.slice(5, 7);
		} else if (/^#[\dA-Fa-f]{8}$/.test(hex)) {
			// #AARRGGBB
			alpha = hex.slice(1, 3);
			red = hex.slice(3, 5);
			green = hex.slice(5, 7);
			blue = hex.slice(7, 9);
		} else {
			throw new GeneralError(Color._CLASS_NAME, "hex");
		}
		return new Color(
			Number.parseInt(alpha, 16),
			Number.parseInt(red, 16),
			Number.parseInt(green, 16),
			Number.parseInt(blue, 16)
		);
	}

	/**
	 * Coerce an unknown type to a color.
	 * @param value The value to try and convert.
	 * @returns The color if one can be created.
	 */
	public static coerce(value: unknown): Color | undefined {
		if (
			Is.object<Color>(value) &&
			Is.number(value._alpha) &&
			Is.number(value._red) &&
			Is.number(value._green) &&
			Is.number(value._blue)
		) {
			return new Color(value._alpha, value._red, value._green, value._blue);
		} else if (Is.stringValue(value) && value.startsWith("#")) {
			try {
				return Color.fromHex(value);
			} catch {}
		}
	}

	/**
	 * Get the alpha element.
	 * @returns The alpha element.
	 */
	public alpha(): number {
		return this._alpha;
	}

	/**
	 * Get the red element.
	 * @returns The red element.
	 */
	public red(): number {
		return this._red;
	}

	/**
	 * Get the green element.
	 * @returns The green element.
	 */
	public green(): number {
		return this._green;
	}

	/**
	 * Get the blue element.
	 * @returns The blue element.
	 */
	public blue(): number {
		return this._blue;
	}

	/**
	 * Get color as argb.
	 * @returns The color as argb.
	 */
	public argb(): number {
		return ((this._alpha << 24) | (this._red << 16) | (this._green << 8) | this._blue) >>> 0;
	}

	/**
	 * Get color as rgba.
	 * @returns The color as rgba.
	 */
	public rgba(): number {
		return ((this._red << 24) | (this._green << 16) | (this._blue << 8) | this._alpha) >>> 0;
	}

	/**
	 * Get color as rgb text.
	 * @returns The color as rgb.
	 */
	public rgbText(): string {
		return `rgb(${this._red},${this._green},${this._blue})`;
	}

	/**
	 * Get color as rgba text.
	 * @returns The color as rgba.
	 */
	public rgbaText(): string {
		return `rgba(${this._red},${this._green},${this._blue},${Math.round((this._alpha / 255) * 100) / 100})`;
	}

	/**
	 * Get color as hex no alpha.
	 * @returns The color as hex with no alpha component.
	 */
	public hex(): string {
		const red = `00${this._red.toString(16)}`.slice(-2);
		const green = `00${this._green.toString(16)}`.slice(-2);
		const blue = `00${this._blue.toString(16)}`.slice(-2);
		return `#${red}${green}${blue}`.toUpperCase();
	}

	/**
	 * Get color as hex with alpha.
	 * @returns The color as hex with with alpha component.
	 */
	public hexWithAlpha(): string {
		const alpha = `00${this._alpha.toString(16)}`.slice(-2);
		const red = `00${this._red.toString(16)}`.slice(-2);
		const green = `00${this._green.toString(16)}`.slice(-2);
		const blue = `00${this._blue.toString(16)}`.slice(-2);
		return `#${alpha}${red}${green}${blue}`.toUpperCase();
	}
}
