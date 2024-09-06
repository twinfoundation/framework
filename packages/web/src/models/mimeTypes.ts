// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Common mime types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MimeTypes = {
	/**
	 * Plaint Text - text/plain
	 */
	PlainText: "text/plain",

	/**
	 * HTML - text/html
	 */
	Html: "text/html",

	/**
	 * Javascript - text/javascript
	 */
	Javascript: "text/javascript",

	/**
	 * JSON - application/json
	 */
	Json: "application/json",

	/**
	 * JSON-LD - application/ld+json
	 */
	JsonLd: "application/ld+json",

	/**
	 * XML - application/xml
	 */
	Xml: "application/xml",

	/**
	 * Application Octet Stream, arbitrary binary - application/octet-stream
	 */
	OctetStream: "application/octet-stream",

	/**
	 * Application GZIP - application/gzip
	 */
	Gzip: "application/gzip",

	/**
	 * Application BZIP2 - application/x-bzip2
	 */
	Bzip2: "application/x-bzip2",

	/**
	 * Application ZIP - application/zip
	 */
	Zip: "application/zip",

	/**
	 * Application PDF - application/pdf
	 */
	Pdf: "application/pdf",

	/**
	 * Image GIF - image/gif
	 */
	Gif: "image/gif",

	/**
	 * Image BMP - image/bmp
	 */
	Bmp: "image/bmp",

	/**
	 * Image JPEG - image/jpeg
	 */
	Jpeg: "image/jpeg",

	/**
	 * Image PNG - image/png
	 */
	Png: "image/png",

	/**
	 * Image Tiff - image/tiff
	 */
	Tiff: "image/tiff",

	/**
	 * Image SVG - image/svg+xml
	 */
	Svg: "image/svg+xml",

	/**
	 * Image WEBP - image/webp
	 */
	WebP: "image/webp",

	/**
	 * Video MP4 - video/mp4
	 */
	Mp4: "video/mp4",

	/**
	 * Audio/Video MPEG - video/mpeg
	 */
	Mpeg: "video/mpeg",

	/**
	 * Video WEBM - video/webm
	 */
	Webm: "video/webm"
} as const;

/**
 * Common mime types.
 */
export type MimeTypes = (typeof MimeTypes)[keyof typeof MimeTypes];
