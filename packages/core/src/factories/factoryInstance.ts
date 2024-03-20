// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { nameof } from "@gtsc/nameof";
import { GeneralError } from "../errors/generalError";
import { Guards } from "../utils/guards";

/**
 * Factory for creating implementation of generic types.
 */
export class FactoryInstance<T> {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<FactoryInstance<unknown>>();

	/**
	 * Type name for the instances.
	 * @internal
	 */
	private readonly _typeName: string;

	/**
	 * Store the generators.
	 * @internal
	 */
	private readonly _generators: {
		[name: string]: {
			generator: () => T;
			order: number;
		};
	};

	/**
	 * Store the created instances.
	 * @internal
	 */
	private _instances: { [name: string]: T };

	/**
	 * Create a new instance of FactoryInstance.
	 * @param typeName The type name for the instances.
	 */
	constructor(typeName: string) {
		this._typeName = typeName;
		this._generators = {};
		this._instances = {};
	}

	/**
	 * Register a new generator.
	 * @param name The name of the generator.
	 * @param generator The function to create an instance.
	 */
	public register<U extends T>(name: string, generator: () => U): void {
		Guards.stringValue(FactoryInstance._CLASS_NAME, nameof(name), name);
		Guards.function(FactoryInstance._CLASS_NAME, nameof(generator), generator);
		this._generators[name] = {
			generator,
			order: Object.keys(this._generators).length
		};
		// Remove any existing instance
		this.removeInstance(name);
	}

	/**
	 * Unregister a generator.
	 * @param name The name of the generator to unregister.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no generator exists.
	 */
	public unregister(name: string): void {
		Guards.stringValue(FactoryInstance._CLASS_NAME, nameof(name), name);
		if (!this._generators[name]) {
			throw new GeneralError(FactoryInstance._CLASS_NAME, "noUnregister", {
				typeName: this._typeName,
				name
			});
		}
		delete this._generators[name];
		// Remove any existing instance
		this.removeInstance(name);
	}

	/**
	 * Get a generator instance.
	 * @param name The name of the instance to generate.
	 * @returns An instance of the item.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no item exists to get.
	 */
	public get<U extends T>(name: string): U {
		const instance = this.getIfExists(name);
		if (!instance) {
			throw new GeneralError(FactoryInstance._CLASS_NAME, "noGet", {
				typeName: this._typeName,
				name
			});
		}
		return instance as U;
	}

	/**
	 * Get a generator instance with no exceptions.
	 * @param name The name of the instance to generate.
	 * @returns An instance of the item or undefined if it does not exist.
	 */
	public getIfExists<U extends T>(name: string): U | undefined {
		Guards.stringValue(FactoryInstance._CLASS_NAME, nameof(name), name);

		if (this._generators[name]) {
			if (!this._instances[name]) {
				this._instances[name] = this._generators[name].generator();
			}
			if (this._instances[name]) {
				return this._instances[name] as U;
			}
		}
	}

	/**
	 * Reset all the instances.
	 */
	public reset(): void {
		for (const name in this._generators) {
			this.removeInstance(name);
		}
		this._instances = {};
	}

	/**
	 * Get all the instances.
	 * @returns The instances.
	 */
	public instances(): { [name: string]: T } {
		return this._instances;
	}

	/**
	 * Get all the generator names in the order they were registered.
	 * @returns The ordered generator names.
	 */
	public names(): string[] {
		const orderedNames: { name: string; order: number }[] = [];
		for (const generator in this._generators) {
			orderedNames.push({
				name: generator,
				order: this._generators[generator].order
			});
		}
		return orderedNames.sort((a, b) => a.order - b.order).map(o => o.name);
	}

	/**
	 * Remove any instances of the given name.
	 * @param name The name of the instances to remove.
	 * @internal
	 */
	private removeInstance(name: string): void {
		delete this._instances[name];
	}
}
