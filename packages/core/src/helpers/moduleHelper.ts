// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "../errors/baseError";
import { GeneralError } from "../errors/generalError";
import { Is } from "../utils/is";

/**
 * Helper functions for modules.
 */
export class ModuleHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<ModuleHelper>();

	/**
	 * Get the module entry.
	 * @param module The module.
	 * @param entry The entry to get from the module.
	 * @returns The entry from the module.
	 * @throws GeneralError if getting the module entry failed.
	 */
	public static async getModuleEntry<T>(module: string, entry: string): Promise<T> {
		try {
			const moduleInstance = await import(module);
			const moduleEntry = moduleInstance[entry];

			if (Is.empty(moduleEntry)) {
				throw new GeneralError(ModuleHelper.CLASS_NAME, "getModuleEntry", {
					module,
					entry
				});
			}

			return moduleEntry as T;
		} catch (err) {
			throw new GeneralError(
				ModuleHelper.CLASS_NAME,
				"getModuleEntry",
				{
					module,
					entry
				},
				BaseError.fromError(err)
			);
		}
	}
}
