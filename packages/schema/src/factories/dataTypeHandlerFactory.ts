// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@gtsc/core";
import type { IDataTypeHandler } from "../models/IDataTypeHandler";

/**
 * Factory for creating handlers for data types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataTypeHandlerFactory = Factory.createFactory<IDataTypeHandler>("data-type");
