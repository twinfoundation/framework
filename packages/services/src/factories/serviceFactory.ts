// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@gtsc/core";
import type { IService } from "../models/IService";

/**
 * Factory for creating implementation of service types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ServiceFactory = Factory.createFactory<IService>("service");
