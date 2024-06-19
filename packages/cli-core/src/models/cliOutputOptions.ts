// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ICliOutputOptionsConsole } from "./ICliOutputOptionsConsole";
import type { ICliOutputOptionsEnv } from "./ICliOutputOptionsEnv";
import type { ICliOutputOptionsJson } from "./ICliOutputOptionsJson";

/**
 * Options for the CLI Output.
 */
export type CliOutputOptions = ICliOutputOptionsConsole &
	ICliOutputOptionsEnv &
	ICliOutputOptionsJson;
