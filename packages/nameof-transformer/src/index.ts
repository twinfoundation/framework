// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type * as ts from "typescript";
import { transformerFactory } from "./transformer";

/**
 * Exports the factory.
 * @returns The factory.
 */
export const factory = (): ts.TransformerFactory<ts.Node> => transformerFactory;

/**
 * Exports the factory version.
 * @returns The factory.
 */
export const version = "0.0.2";

/**
 * Exports the factory name.
 * @returns The factory.
 */
export const name = "@gtsc/nameof-transformer";

export * from "./manual";
export * from "./svelte";

export default factory;
