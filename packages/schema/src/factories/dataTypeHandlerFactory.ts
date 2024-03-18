// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GeneralError, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IDataTypeHandler } from "../models/IDataTypeHandler";

/**
 * Factory for creating handlers for data types.
 */
export class DataTypeHandlerFactory {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<DataTypeHandlerFactory>();

	/**
	 * Store the handlers.
	 * @internal
	 */
	private static readonly _handlerGenerators: {
		[type: string]: IDataTypeHandler;
	} = {};

	/**
	 * Register a new data type handler.
	 * @param dataType The function to create an instance.
	 */
	public static register(dataType: IDataTypeHandler): void {
		Guards.object<IDataTypeHandler>(DataTypeHandlerFactory._CLASS_NAME, nameof(dataType), dataType);
		this._handlerGenerators[dataType.type] = dataType;
	}

	/**
	 * Unregister a data type handler.
	 * @param type The type supported by the handler to unregister.
	 * @throws GuardError if the parameters are invalid.
	 * @throws GeneralError if no service exists to unregister.
	 */
	public static unregister(type: string): void {
		Guards.stringValue(DataTypeHandlerFactory._CLASS_NAME, nameof(type), type);
		if (!this._handlerGenerators[type]) {
			throw new GeneralError(DataTypeHandlerFactory._CLASS_NAME, "unregister", {
				type
			});
		}
		delete this._handlerGenerators[type];
	}

	/**
	 * Get a handler instance.
	 * @param schema The schema of the instance to generate.
	 * @returns An instance of the service.
	 */
	public static get(schema: string): IDataTypeHandler | undefined {
		Guards.stringValue(DataTypeHandlerFactory._CLASS_NAME, nameof(schema), schema);
		if (this._handlerGenerators[schema]) {
			return this._handlerGenerators[schema];
		}
	}

	/**
	 * Get all the dataTypes supported.
	 * @returns The list of supported data types.
	 */
	public static dataTypes(): IDataTypeHandler[] {
		return Object.values(this._handlerGenerators);
	}
}
