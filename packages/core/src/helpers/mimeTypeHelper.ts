// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-continue */
/* eslint-disable no-bitwise */
import { Converter } from "../utils/converter";
import { Is } from "../utils/is";

/**
 * Class to help with mime types.
 */
export class MimeTypeHelper {
	/**
	 * Detect the mime type from a byte array.
	 * @param data The data to test.
	 * @returns The mime type if detected.
	 */
	public static async detect(data: Uint8Array): Promise<string | undefined> {
		if (!Is.uint8Array(data)) {
			return undefined;
		}

		// Image
		if (MimeTypeHelper.checkBytes(data, [0x47, 0x49, 0x46])) {
			return "image/gif";
		}

		if (MimeTypeHelper.checkBytes(data, [0x42, 0x4d])) {
			return "image/bmp";
		}
		if (MimeTypeHelper.checkBytes(data, [0xff, 0xd8, 0xff])) {
			return "image/jpeg";
		}

		if (MimeTypeHelper.checkBytes(data, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
			return "image/png";
		}

		// Compression
		if (MimeTypeHelper.checkBytes(data, [0x1f, 0x8b, 0x8])) {
			return "application/gzip";
		}

		if (MimeTypeHelper.checkBytes(data, [0x42, 0x5a, 0x68])) {
			return "application/x-bzip2";
		}

		if (MimeTypeHelper.checkBytes(data, [0x50, 0x4b, 0x3, 0x4])) {
			return "application/zip";
		}

		// Documents
		if (MimeTypeHelper.checkText(data, ["%PDF"])) {
			return "application/pdf";
		}

		// Lookup svg before xml, as svg are xml files as well
		const asText = Converter.bytesToUtf8(data);
		if (asText.includes("<svg")) {
			return "image/svg+xml";
		}

		if (MimeTypeHelper.checkText(data, ["<?xml ", "<message"])) {
			return "application/xml";
		}

		if (
			MimeTypeHelper.checkBytes(data, [0xef, 0xbb, 0xbf]) &&
			MimeTypeHelper.checkText(data, ["<?xml "], 3)
		) {
			// UTF-8-BOM
			return "application/xml";
		}

		if (MimeTypeHelper.isUtf8(data)) {
			try {
				JSON.parse(new TextDecoder().decode(data));
				return "application/json";
			} catch {
				return "text/plain";
			}
		}
	}

	/**
	 * Return the default extension for a mime type.
	 * @param mimeType The mimetype to get the extension for.
	 * @returns The extension for the mime type.
	 */
	public static defaultExtension(mimeType: string | undefined): string | undefined {
		if (!Is.stringValue(mimeType)) {
			return undefined;
		}

		const lookup: { [mimeType: string]: string } = {
			"image/gif": "gif",
			"image/bmp": "bmp",
			"image/jpeg": "jpg",
			"image/png": "png",
			"application/gzip": "gz",
			"application/x-bzip2": "bz2",
			"application/zip": "zip",
			"application/pdf": "pdf",
			"image/svg+xml": "svg",
			"application/xml": "xml",
			"text/plain": "txt",
			"application/json": "json"
		};

		return lookup[mimeType];
	}

	/**
	 * Check if the bytes match.
	 * @param data The data to look at.
	 * @param bytes The bytes to try and match.
	 * @param startOffset Start offset in the data.
	 * @returns True if the bytes match.
	 * @internal
	 */
	private static checkBytes(data: Uint8Array, bytes: number[], startOffset = 0): boolean {
		if (data.length - startOffset < bytes.length) {
			return false;
		}

		for (let i = 0; i < bytes.length; i++) {
			if (data[i + startOffset] !== bytes[i]) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Check if the text matches.
	 * @param data The data to look at.
	 * @param texts The text to try and match.
	 * @param startOffset Start offset in the data.
	 * @returns True if the bytes match.
	 * @internal
	 */
	private static checkText(data: Uint8Array, texts: string[], startOffset = 0): boolean {
		return texts.some(text =>
			MimeTypeHelper.checkBytes(data, Array.from(Converter.utf8ToBytes(text)), startOffset)
		);
	}

	/**
	 * Check if a Node.js Buffer or Uint8Array is UTF-8.
	 * Url https://tools.ietf.org/html/rfc3629
	 * Source https://github.com/hcodes/isutf8
	 * UTF8-char = UTF8-1 / UTF8-2 / UTF8-3 / UTF8-4.
	 * UTF8-1    = %x00-7F.
	 * UTF8-2    = %xC2-DF UTF8-tail.
	 * UTF8-3    = %xE0 %xA0-BF UTF8-tail.
	 * -           %xE1-EC 2( UTF8-tail ).
	 * -           %xED %x80-9F UTF8-tail.
	 * -           %xEE-EF 2( UTF8-tail ).
	 * UTF8-4    = %xF0 %x90-BF 2( UTF8-tail ).
	 * -           %xF1-F3 3( UTF8-tail ).
	 * -           %xF4 %x80-8F 2( UTF8-tail ).
	 * UTF8-tail = %x80-BF.
	 * @param data The data to check.
	 * @returns True if the data is utf8.
	 * @internal
	 */
	private static isUtf8(data: Uint8Array): boolean {
		if (!Is.uint8Array(data)) {
			return false;
		}

		let i = 0;
		const len = data.length;

		while (i < len) {
			// UTF8-1 = %x00-7F
			if (data[i] <= 0x7f) {
				i++;

				continue;
			}

			// UTF8-2 = %xC2-DF UTF8-tail
			if (data[i] >= 0xc2 && data[i] <= 0xdf) {
				// if(buf[i + 1] >= 0x80 && buf[i + 1] <= 0xBF) {
				if (data[i + 1] >> 6 === 2) {
					i += 2;

					continue;
				} else {
					return false;
				}
			}

			// UTF8-3 = %xE0 %xA0-BF UTF8-tail
			// UTF8-3 = %xED %x80-9F UTF8-tail
			if (
				((data[i] === 0xe0 && data[i + 1] >= 0xa0 && data[i + 1] <= 0xbf) ||
					(data[i] === 0xed && data[i + 1] >= 0x80 && data[i + 1] <= 0x9f)) &&
				data[i + 2] >> 6 === 2
			) {
				i += 3;

				continue;
			}

			// UTF8-3 = %xE1-EC 2( UTF8-tail )
			// UTF8-3 = %xEE-EF 2( UTF8-tail )
			if (
				((data[i] >= 0xe1 && data[i] <= 0xec) || (data[i] >= 0xee && data[i] <= 0xef)) &&
				data[i + 1] >> 6 === 2 &&
				data[i + 2] >> 6 === 2
			) {
				i += 3;

				continue;
			}

			// UTF8-4 = %xF0 %x90-BF 2( UTF8-tail )
			//          %xF1-F3 3( UTF8-tail )
			//          %xF4 %x80-8F 2( UTF8-tail )
			if (
				((data[i] === 0xf0 && data[i + 1] >= 0x90 && data[i + 1] <= 0xbf) ||
					(data[i] >= 0xf1 && data[i] <= 0xf3 && data[i + 1] >> 6 === 2) ||
					(data[i] === 0xf4 && data[i + 1] >= 0x80 && data[i + 1] <= 0x8f)) &&
				data[i + 2] >> 6 === 2 &&
				data[i + 3] >> 6 === 2
			) {
				i += 4;

				continue;
			}

			return false;
		}

		return true;
	}
}
