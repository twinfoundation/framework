// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { LogLevel } from "./logLevel";

/**
 * Interface describing a log entry.
 */
export interface ILogEntry {
	/**
	 * The level of the error being logged.
	 */
	level: LogLevel;

	/**
	 * The source of the log entry.
	 */
	source: string;

	/**
	 * The timestamp of the log entry.
	 */
	ts: number;

	/**
	 * The message.
	 */
	message: string;

	/**
	 * Optional error details.
	 */
	error?: unknown;

	/**
	 * Optional data for the message.
	 */
	data?: unknown;
}
