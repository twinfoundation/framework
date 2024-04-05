// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { nameof } from "@gtsc/nameof";
import { GeneralError } from "../errors/generalError";
import { Guards } from "../utils/guards";
import { Is } from "../utils/is";

/**
 * Factory for creating implementation of generic types.
 */
export class Factory<T> {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Factory<unknown>>();

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
	 * Counter for the ordering.
	 * @internal
	 */
	private _orderCounter: number;

	/**
	 * Automatically created an instance when registered.
	 * @internal
	 */
	private readonly _autoInstance: boolean;

	/**
	 * Match the name of the instance.
	 * @internal
	 */
	private readonly _matcher: (names: string[], name: string) => string | undefined;

	/**
	 * Create a new instance of Factory.
	 * @param typeName The type name for the instances.
	 * @param autoInstance Automatically create an instance when registered.
	 * @param matcher Match the name of the instance.
	 */
	constructor(
		typeName: string,
		autoInstance: boolean = false,
		matcher?: (names: string[], name: string) => string | undefined
	) {
		this._typeName = typeName;
		this._generators = {};
		this._instances = {};
		this._orderCounter = 0;
		this._autoInstance = autoInstance;
		this._matcher = matcher ?? this.defaultMatcher.bind(this);
	}

	/**
	 * Register a new generator.
	 * @param name The name of the generator.
	 * @param generator The function to create an instance.
	 */
	public register<U extends T>(name: string, generator: () => U): void {
		Guards.stringValue(Factory._CLASS_NAME, nameof(name), name);
		Guards.function(Factory._CLASS_NAME, nameof(generator), generator);
		this._generators[name] = {
			generator,
			order: this._orderCounter++
		};
		// Remove any existing instance
		this.removeInstance(name);
		if (this._autoInstance) {
			this._instances[name] = generator();
		}
	}

	/**
	 * Unregister a generator.
	 * @param name The name of the generator to unregister.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no generator exists.
	 */
	public unregister(name: string): void {
		Guards.stringValue(Factory._CLASS_NAME, nameof(name), name);
		if (!this._generators[name]) {
			throw new GeneralError(Factory._CLASS_NAME, "noUnregister", {
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
			throw new GeneralError(Factory._CLASS_NAME, "noGet", {
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
		Guards.stringValue(Factory._CLASS_NAME, nameof(name), name);

		const matchName = this._matcher(Object.keys(this._generators), name);

		if (Is.stringValue(matchName) && this._generators[matchName]) {
			if (!this._instances[matchName]) {
				this._instances[matchName] = this._generators[matchName].generator();
			}
			if (this._instances[matchName]) {
				return this._instances[matchName] as U;
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
	 * Get all the instances as a map.
	 * @returns The instances as a map.
	 */
	public instancesMap(): { [name: string]: T } {
		return this._instances;
	}

	/**
	 * Get all the instances as a list in the order they were registered.
	 * @returns The instances as a list in the order they were registered.
	 */
	public instancesList(): T[] {
		const orderedInstances: { instance: T; order: number }[] = [];
		for (const instanceName in this._instances) {
			orderedInstances.push({
				instance: this._instances[instanceName],
				order: this._generators[instanceName].order
			});
		}
		return orderedInstances.sort((a, b) => a.order - b.order).map(o => o.instance);
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

	/**
	 * Match the requested name to the generator name.
	 * @param names The list of names for all the generators.
	 * @param name The name to match.
	 * @returns The matched name or undefined if no match.
	 */
	private defaultMatcher(names: string[], name: string): string | undefined {
		return this._generators[name] ? name : undefined;
	}
}
