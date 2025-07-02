// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Replace the transformers manually.
 * @param content The content to replace the transformers in.
 * @returns The content with the transformers replace.
 */
export function manual(content: string): string {
	if (typeof content === "string" && content.includes("nameof")) {
		// Remove the import
		content = content.replace(/import.*from "@twin\.org\/nameof";/g, "");

		// Replace the nameof<IMyObject>() with "IMyObject"
		// or the nameof<IMyObject<IType2>>() with "IMyObject"
		const nameRegEx = /nameof<(.*?)(?:<.*>)?>\(\)/g;
		content = content.replace(nameRegEx, '"$1"');

		// Replace the nameof(object?.prop) with "object.prop"
		const propRegEx = /nameof\((.*?)\)/g;
		content = content.replace(propRegEx, '"$1"');
	}
	return content;
}
