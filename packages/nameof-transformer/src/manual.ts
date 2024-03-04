// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Replace the transformers manually.
 * @param content The content to replace the transformers in.
 * @returns The content with the transformers replace.
 */
export function manual(content: string): string {
	if (content.includes("nameof")) {
		// Remove the import
		content = content.replace(/import.*from "@gtsc\/nameof";/g, "");

		// Replace the nameof<IMyObject>() with "IMyObject"
		const nameRegEx = /nameof<(.*?)>\(\)/g;
		let matchName;
		do {
			matchName = nameRegEx.exec(content);
			if (matchName && matchName.length === 2) {
				content = content.replace(matchName[0], `"${matchName[1].replace(/\?/g, "")}"`);
			}
		} while (matchName);

		// Replace the nameof(object?.prop) with "object.prop"
		const propRegEx = /nameof\((.*?)\)/g;
		let matchProp;
		do {
			matchProp = propRegEx.exec(content);
			if (matchProp && matchProp.length === 2) {
				content = content.replace(matchProp[0], `"${matchProp[1].replace(/\?/g, "")}"`);
			}
		} while (matchProp);
	}
	return content;
}
