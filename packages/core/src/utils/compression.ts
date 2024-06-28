// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
import { nameof } from "@gtsc/nameof";
import { Guards } from "./guards";
import { CompressionType } from "../models/compressionType";

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
		Guards.arrayOneOf(Compression._CLASS_NAME, nameof(type), type, Object.values(CompressionType));

		const blob = new Blob([bytes]);
		const ds = new CompressionStream(type);
		const compressedStream = blob.stream().pipeThrough(ds);
		const compressedBlob = await new Response(compressedStream).blob();
		const ab = await compressedBlob.arrayBuffer();
		const compressedBytes = new Uint8Array(ab);

		// GZIP header contains a byte which specifies the OS the
		// compression was performed on. We set this to 3 (Unix) to ensure
		// that we produce consistent results.
		if (type === "gzip" && compressedBytes.length >= 10) {
			compressedBytes[9] = 3;
		}

		return compressedBytes;
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
		Guards.arrayOneOf(Compression._CLASS_NAME, nameof(type), type, Object.values(CompressionType));

		const blob = new Blob([compressedBytes]);
		const ds = new DecompressionStream(type);
		const decompressedStream = blob.stream().pipeThrough(ds);
		const decompressedBlob = await new Response(decompressedStream).blob();
		const ab = await decompressedBlob.arrayBuffer();
		return new Uint8Array(ab);
	}
}
