// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { manual } from "./manual";

/**
 * Return a function that can be used as a svelte preprocessor.
 * @returns The preprocessor.
 */
export function tsTransformersPreProcess(): { markup: unknown } {
	return {
		markup: tsTransformersPreProcessMarkup
	};
}

/**
 * Convert the content with a svelte preprocessor.
 * @param params The parameters for the preprocessor.
 * @param params.content The content for the preprocessor.
 * @returns The converted content.
 */
async function tsTransformersPreProcessMarkup(params: {
	content: string;
}): Promise<{ code: string }> {
	return {
		code: manual(params.content)
	};
}
