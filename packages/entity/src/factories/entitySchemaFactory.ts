// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@gtsc/core";
import type { IEntitySchema } from "../models/IEntitySchema";

/**
 * Factory for creating entity schemas.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntitySchemaFactory = Factory.createFactory<IEntitySchema>("entitySchema");
