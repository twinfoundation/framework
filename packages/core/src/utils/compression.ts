// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { Guards } from "./guards";
import { Is } from "./is";
import { Uint8ArrayHelper } from "../helpers/uint8ArrayHelper";
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

		const cs = new CompressionStream(type);
		const writer = cs.writable.getWriter();
		await writer.write(bytes);
		await writer.close();

		const reader = cs.readable.getReader();
		const chunks = await Compression.streamToChunks(reader);

		const concatenated = Uint8ArrayHelper.concat(chunks);

		// GZIP header contains a byte which specifies the OS the
		// compression was performed on. We set this to 3 (Unix) to ensure
		// that we produce consistent results.
		if (type === "gzip" && concatenated.length >= 10) {
			concatenated[9] = 3;
		}

		return concatenated;
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

		const cs = new DecompressionStream(type);
		const writer = cs.writable.getWriter();
		await writer.write(compressedBytes);
		await writer.close();

		const reader = cs.readable.getReader();
		const chunks = await Compression.streamToChunks(reader);

		return Uint8ArrayHelper.concat(chunks);
	}

	/**
	 * Read the stream and create a list of chunks.
	 * @param reader The reader to read the chunks from.
	 * @returns The chunks.
	 * @internal
	 */
	private static async streamToChunks(reader: ReadableStreamDefaultReader): Promise<Uint8Array[]> {
		const chunks: Uint8Array[] = [];

		let done = false;
		do {
			const chunk = await reader.read();
			done = chunk.done;
			if (!done && Is.uint8Array(chunk.value)) {
				chunks.push(chunk.value);
			}
		} while (!done);

		return chunks;
	}
}
