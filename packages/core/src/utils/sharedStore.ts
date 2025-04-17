// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "./is";

/**
 * Provide a store for shared objects which can be accesses through multiple
 * instance loads of a packages.
 */
export class SharedStore {
	/**
	 * Get a property from the shared store.
	 * @param prop The name of the property to get.
	 * @returns The property if it exists.
	 */
	public static get<T = unknown>(prop: string): T | undefined {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const shared = (globalThis as any).__TWIN_SHARED__;
		if (Is.undefined(shared)) {
			return;
		}

		return shared[prop] as T;
	}

	/**
	 * Set the property in the shared store.
	 * @param prop The name of the property to set.
	 * @param value The value to set.
	 */
	public static set<T = unknown>(prop: string, value: T): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (Is.undefined((globalThis as any).__TWIN_SHARED__)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(globalThis as any).__TWIN_SHARED__ = {};
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any).__TWIN_SHARED__[prop] = value;
	}

	/**
	 * Remove a property from the shared store.
	 * @param prop The name of the property to remove.
	 */
	public static remove(prop: string): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const shared = (globalThis as any).__TWIN_SHARED__;
		if (!Is.undefined(shared)) {
			delete shared[prop];
		}
	}
}
