// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable promise/prefer-await-to-then */
import { Worker } from "node:worker_threads";
import { BaseError, GeneralError, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

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
		let moduleInstance;

		try {
			moduleInstance = await import(module);
		} catch (err) {
			throw new GeneralError(
				ModuleHelper.CLASS_NAME,
				"moduleNotFound",
				{
					module,
					entry
				},
				BaseError.fromError(err)
			);
		}

		const moduleEntry = moduleInstance[entry];

		if (Is.empty(moduleEntry)) {
			throw new GeneralError(ModuleHelper.CLASS_NAME, "entryNotFound", {
				module,
				entry
			});
		}

		return moduleEntry as T;
	}

	/**
	 * Get the method from a module.
	 * @param module The module.
	 * @param method The method to execute from the module, use dot notation to get a static class method.
	 * @returns The result of the method execution.
	 * @throws GeneralError if executing the module entry failed.
	 */
	public static async getModuleMethod<T>(
		module: string,
		method: string
	): Promise<(...args: unknown[]) => T> {
		const methodParts = method.split(".");

		if (methodParts.length === 2) {
			const moduleEntry = await ModuleHelper.getModuleEntry<{
				[id: string]: (...args: unknown[]) => T;
			}>(module, methodParts[0]);

			if (Is.function(moduleEntry[methodParts[1]])) {
				return moduleEntry[methodParts[1]];
			}
			throw new GeneralError(ModuleHelper.CLASS_NAME, "notFunction", {
				module,
				entry: method
			});
		}

		const moduleEntry = await ModuleHelper.getModuleEntry<(...args: unknown[]) => T>(
			module,
			methodParts[0]
		);

		if (Is.function(moduleEntry)) {
			return moduleEntry;
		}

		throw new GeneralError(ModuleHelper.CLASS_NAME, "notFunction", {
			module,
			entry: method
		});
	}

	/**
	 * Execute the method in the module.
	 * @param module The module.
	 * @param method The method to execute from the module.
	 * @param args The arguments to pass to the method.
	 * @returns The result of the method execution.
	 * @throws GeneralError if executing the module entry failed.
	 */
	public static async execModuleMethod<T>(
		module: string,
		method: string,
		args?: unknown[]
	): Promise<T> {
		const moduleMethod = await ModuleHelper.getModuleMethod<T>(module, method);

		return moduleMethod(...(args ?? []));
	}

	/**
	 * Execute the method in the module in a thread.
	 * @param module The module.
	 * @param method The method to execute from the module.
	 * @param args The arguments to pass to the method.
	 * @returns The result of the method execution.
	 * @throws GeneralError if executing the module entry failed.
	 */
	public static async execModuleMethodThread<T>(
		module: string,
		method: string,
		args?: unknown[]
	): Promise<T> {
		return new Promise((resolve, reject) => {
			const worker = new Worker(
				`
			  (async () => {
				const { workerData, parentPort } = await import('worker_threads');

				function rejectError(type, innerError) {
					parentPort.postMessage({ errorType: type, innerError });
				}

				function resolveResult(result) {
					Promise.resolve(result).then(res => parentPort.postMessage({ result: res }));
				}

				const { module, method, args } = workerData;

				import(module)
					.then(moduleInstance => {
						const methodParts = method.split(".");
						const moduleEntry = moduleInstance[methodParts[0]];

						if (moduleEntry === undefined) {
							rejectError("entryNotFound");
						} else if (methodParts.length === 2) {
							const moduleMethod = moduleEntry[methodParts[1]];
							if (typeof moduleMethod === "function") {
								resolveResult(moduleMethod(...(args ?? [])));
							} else {
								rejectError("notFunction");
							}
						} else if (typeof moduleEntry === "function") {
							resolveResult(moduleEntry(...(args ?? [])));
						} else {
							rejectError("notFunction");
						}
					})
					.catch(err => {
						rejectError("moduleNotFound", err);
					});
			})();
			`,
				{ eval: true, workerData: { module, method, args: args ?? [] } }
			);

			worker.on("message", msg => {
				if (Is.stringValue(msg.errorType)) {
					reject(
						new GeneralError(
							ModuleHelper.CLASS_NAME,
							msg.errorType,
							{ module, entry: method },
							msg.innerError
						)
					);
				} else {
					resolve(msg.result);
				}
			});

			worker.on("error", err => {
				reject(
					new GeneralError(
						ModuleHelper.CLASS_NAME,
						"workerException",
						{
							module,
							entry: method
						},
						err
					)
				);
			});

			worker.on("exit", code => {
				if (code === 1) {
					reject(
						new GeneralError(ModuleHelper.CLASS_NAME, "workerFailed", {
							module,
							entry: method,
							exitCode: code
						})
					);
				}
			});
		});
	}
}
