// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { StringHelper } from "./stringHelper";
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

		if (StringHelper.isUtf8(data)) {
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
}
