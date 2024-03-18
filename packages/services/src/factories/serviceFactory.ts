// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GeneralError, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IService } from "../models/IService";

/**
 * Factory for creating implementation of service types.
 */
export class ServiceFactory {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<ServiceFactory>();

	/**
	 * Store the generators.
	 * @internal
	 */
	private static readonly _generators: {
		[name: string]: {
			generator: () => unknown;
			order: number;
		};
	} = {};

	/**
	 * Store the created instances.
	 * @internal
	 */
	private static _instances: { [name: string]: IService } = {};

	/**
	 * Register a new generator.
	 * @param name The name of the generator.
	 * @param generator The function to create an instance.
	 */
	public static register(name: string, generator: () => unknown): void {
		Guards.stringValue(ServiceFactory._CLASS_NAME, nameof(name), name);
		Guards.function(ServiceFactory._CLASS_NAME, nameof(generator), generator);
		ServiceFactory._generators[name] = {
			generator,
			order: Object.keys(ServiceFactory._generators).length
		};
		// Remove any existing instance
		ServiceFactory.removeInstance(name);
	}

	/**
	 * Unregister a generator.
	 * @param name The name of the generator to unregister.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no service exists.
	 */
	public static unregister(name: string): void {
		Guards.stringValue(ServiceFactory._CLASS_NAME, nameof(name), name);
		if (!ServiceFactory._generators[name]) {
			throw new GeneralError(ServiceFactory._CLASS_NAME, "noServiceUnregister", { name });
		}
		delete ServiceFactory._generators[name];
		// Remove any existing instance
		ServiceFactory.removeInstance(name);
	}

	/**
	 * Get a generator instance.
	 * @param name The name of the instance to generate.
	 * @returns An instance of the service.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no service exists to get.
	 */
	public static get<T extends IService>(name: string): T {
		const instance = ServiceFactory.getIfExists<T>(name);
		if (!instance) {
			throw new GeneralError(ServiceFactory._CLASS_NAME, "noServiceGet", {
				name
			});
		}
		return instance;
	}

	/**
	 * Get a generator instance with no exceptions.
	 * @param name The name of the instance to generate.
	 * @returns An instance of the service or undefined if it does not exist.
	 */
	public static getIfExists<T extends IService>(name: string): T | undefined {
		Guards.stringValue(ServiceFactory._CLASS_NAME, nameof(name), name);

		if (ServiceFactory._generators[name]) {
			// If there is a tenantId then create a separate instance based on that id
			if (!ServiceFactory._instances[name]) {
				ServiceFactory._instances[name] = ServiceFactory._generators[name].generator() as IService;
			}
			if (ServiceFactory._instances[name]) {
				return ServiceFactory._instances[name] as T;
			}
		}
	}

	/**
	 * Reset all the service instances.
	 */
	public static reset(): void {
		for (const name in ServiceFactory._generators) {
			ServiceFactory.removeInstance(name);
		}
		ServiceFactory._instances = {};
	}

	/**
	 * Get all the service instances.
	 * @returns The service instances.
	 */
	public static instances(): { [name: string]: IService } {
		return ServiceFactory._instances;
	}

	/**
	 * Get all the service names in the order they were registered.
	 * @returns The ordered service names.
	 */
	public static names(): string[] {
		const orderedNames: { name: string; order: number }[] = [];
		for (const service in ServiceFactory._generators) {
			orderedNames.push({
				name: service,
				order: ServiceFactory._generators[service].order
			});
		}
		return orderedNames.sort((a, b) => a.order - b.order).map(o => o.name);
	}

	/**
	 * Remove any instances of the given name.
	 * @param name The name of the instances to remove.
	 * @internal
	 */
	private static removeInstance(name: string): void {
		delete ServiceFactory._instances[name];
	}
}
