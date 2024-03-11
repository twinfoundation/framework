// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Coerce } from "../utils/coerce";
import { Is } from "../utils/is";

/**
 * Class to help with filenames.
 */
export class FilenameHelper {
	/**
	 * Replaces any unsafe characters in the filename.
	 * @param filename The filename to make safe.
	 * @returns The safe filename.
	 */
	public static safeFilename(filename: unknown): string {
		let safe = Coerce.string(filename);

		if (Is.empty(safe)) {
			return "";
		}

		// Common non filename characters
		safe = safe.replace(/["*/:<>?\\|]/g, "_");
		// Windows non filename characters
		safe = safe.replace(/^(con|prn|aux|nul|com\d|lpt\d)$/i, "_");
		// Control characters
		safe = safe.replace(/[\u0000-\u001F\u0080-\u009F]/g, "_");
		// Relative paths
		safe = safe.replace(/^\.+/, "_");
		// Trailing periods
		safe = safe.replace(/\.+$/, "");

		return safe;
	}
}
