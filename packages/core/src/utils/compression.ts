// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { nameof } from "@gtsc/nameof";
import { Guards } from "./guards";
import type { CompressionType } from "../models/compressionType";

/**
 * A class to handle compression.
 */
export class Compression {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Compression>();

	/**
	 * Compress bytes using GZIP.
	 * @param bytes The bytes to compress.
	 * @param type The type of compression to use.
	 * @returns The compressed bytes.
	 */
	public static async compress(bytes: Uint8Array, type: CompressionType): Promise<Uint8Array> {
		Guards.uint8Array(Compression._CLASS_NAME, nameof(bytes), bytes);

		const cs = new CompressionStream(type);
		const writer = cs.writable.getWriter();
		await writer.write(bytes);
		await writer.close();

		const compressedData = [];
		const reader = cs.readable.getReader();
		let result;
		while (!(result = await reader.read()).done) {
			compressedData.push(...result.value);
		}

		// GZIP header contains a byte which specifies the OS the
		// compression was performed on. We set this to 3 (Unix) to ensure
		// that we produce consistent results.
		if (type === "gzip" && compressedData.length >= 10) {
			compressedData[9] = 3;
		}

		return new Uint8Array(compressedData);
	}

	/**
	 * Decompress a gzipped compressed byte array.
	 * @param compressedBytes The compressed bytes.
	 * @param type The type of compression to use.
	 * @returns The decompressed bytes.
	 */
	public static async decompress(
		compressedBytes: Uint8Array,
		type: CompressionType
	): Promise<Uint8Array> {
		Guards.uint8Array(Compression._CLASS_NAME, nameof(compressedBytes), compressedBytes);

		const cs = new DecompressionStream(type);
		const writer = cs.writable.getWriter();
		await writer.write(compressedBytes);
		await writer.close();

		const decompressedData = [];
		const reader = cs.readable.getReader();
		let result;
		while (!(result = await reader.read()).done) {
			decompressedData.push(...result.value);
		}

		return new Uint8Array(decompressedData);
	}
}
