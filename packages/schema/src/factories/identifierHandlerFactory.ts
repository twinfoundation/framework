// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards, Urn } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IIdentifierHandler } from "../models/IIdentifierHandler";

/**
 * Factory for creating handlers for identifiers.
 */
export class IdentifierHandlerFactory {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<IdentifierHandlerFactory>();

	/**
	 * Store the handlers.
	 * @internal
	 */
	private static readonly _handlerGenerators: {
		[namespace: string]: IIdentifierHandler;
	} = {};

	/**
	 * Register a new identifier handler.
	 * @param identifier The function to create an instance.
	 */
	public static register(identifier: IIdentifierHandler): void {
		Guards.object<IIdentifierHandler>(
			IdentifierHandlerFactory._CLASS_NAME,
			nameof(identifier),
			identifier
		);
		this._handlerGenerators[identifier.namespace] = identifier;
	}

	/**
	 * Unregister a identifier handler.
	 * @param type The type supported by the handler to unregister.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no service exists to unregister.
	 */
	public static unregister(type: string): void {
		Guards.stringValue(IdentifierHandlerFactory._CLASS_NAME, nameof(type), type);
		if (!this._handlerGenerators[type]) {
			throw new GeneralError(IdentifierHandlerFactory._CLASS_NAME, "unregister", {
				type
			});
		}
		delete this._handlerGenerators[type];
	}

	/**
	 * Get a handler instance.
	 * @param uri Breakdown a uri to see if we can find a matching handler.
	 * @returns An instance of the service.
	 */
	public static get(uri: string): IIdentifierHandler | undefined {
		Urn.guard(IdentifierHandlerFactory._CLASS_NAME, nameof(uri), Urn.addPrefix(uri));

		const urn = Urn.fromValidString(uri).toString(true);

		const parts = urn.split(":");

		for (let i = parts.length - 1; i >= 0; i--) {
			const wholeNamespace = parts.slice(i).join(":");
			if (this._handlerGenerators[wholeNamespace]) {
				return this._handlerGenerators[wholeNamespace];
			}
		}
	}

	/**
	 * Get all the namespaces supported.
	 * @returns The list of supported namespaces.
	 */
	public static namespaces(): IIdentifierHandler[] {
		return Object.values(this._handlerGenerators);
	}
}
