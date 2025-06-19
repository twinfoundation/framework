// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter, Is, StringHelper } from "@twin.org/core";
import { MimeTypes } from "../models/mimeTypes";

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
		if (!Is.uint8Array(data) || data.length === 0) {
			return undefined;
		}

		// Image
		if (MimeTypeHelper.checkBytes(data, [0x47, 0x49, 0x46])) {
			return MimeTypes.Gif;
		}

		if (MimeTypeHelper.checkBytes(data, [0x42, 0x4d])) {
			return MimeTypes.Bmp;
		}
		if (MimeTypeHelper.checkBytes(data, [0xff, 0xd8, 0xff])) {
			return MimeTypes.Jpeg;
		}

		if (MimeTypeHelper.checkBytes(data, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
			return MimeTypes.Png;
		}

		if (
			MimeTypeHelper.checkBytes(data, [0x49, 0x49, 0x2a, 0x00]) ||
			MimeTypeHelper.checkBytes(data, [0x4d, 0x4d, 0x00, 0x2a])
		) {
			return MimeTypes.Tiff;
		}

		// Compression
		if (MimeTypeHelper.checkBytes(data, [0x1f, 0x8b, 0x8])) {
			return MimeTypes.Gzip;
		}

		if (
			MimeTypeHelper.checkBytes(data, [0x78, 0x01]) ||
			MimeTypeHelper.checkBytes(data, [0x78, 0x9c]) ||
			MimeTypeHelper.checkBytes(data, [0x78, 0xda])
		) {
			return MimeTypes.Zlib;
		}

		if (MimeTypeHelper.checkBytes(data, [0x42, 0x5a, 0x68])) {
			return MimeTypes.Bzip2;
		}

		if (MimeTypeHelper.checkBytes(data, [0x50, 0x4b, 0x3, 0x4])) {
			return MimeTypes.Zip;
		}

		// Documents
		if (MimeTypeHelper.checkText(data, ["%PDF"])) {
			return MimeTypes.Pdf;
		}

		// Lookup svg before xml, as svg are xml files as well
		const asText = Converter.bytesToUtf8(data);
		if (asText.includes("<svg")) {
			return MimeTypes.Svg;
		}

		if (MimeTypeHelper.checkText(data, ["<?xml ", "<message"])) {
			return MimeTypes.Xml;
		}

		if (
			MimeTypeHelper.checkBytes(data, [0xef, 0xbb, 0xbf]) &&
			MimeTypeHelper.checkText(data, ["<?xml "], 3)
		) {
			// UTF-8-BOM
			return MimeTypes.Xml;
		}

		if (StringHelper.isUtf8(data)) {
			try {
				JSON.parse(new TextDecoder().decode(data));
				return MimeTypes.Json;
			} catch {
				return MimeTypes.PlainText;
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
			[MimeTypes.PlainText]: "txt",
			[MimeTypes.Html]: "html",
			[MimeTypes.Javascript]: "js",
			[MimeTypes.Json]: "json",
			[MimeTypes.JsonLd]: "jsonld",
			[MimeTypes.Jwt]: "jwt",
			[MimeTypes.Xml]: "xml",
			[MimeTypes.OctetStream]: "bin",
			[MimeTypes.Gzip]: "gzip",
			[MimeTypes.Zlib]: "zlib",
			[MimeTypes.Bzip2]: "bz2",
			[MimeTypes.Zip]: "zip",
			[MimeTypes.Pdf]: "pdf",
			[MimeTypes.Gif]: "gif",
			[MimeTypes.Bmp]: "bmp",
			[MimeTypes.Jpeg]: "jpeg",
			[MimeTypes.Png]: "png",
			[MimeTypes.Tiff]: "tif",
			[MimeTypes.Svg]: "svg",
			[MimeTypes.WebP]: "webp",
			[MimeTypes.Mp4]: "mp4",
			[MimeTypes.Mpeg]: "mpg",
			[MimeTypes.Webm]: "webm"
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
