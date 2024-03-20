// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { FactoryInstance } from "@gtsc/core";
import type { IService } from "../models/IService";

/**
 * Factory for creating implementation of service types.
 */
export class ServiceFactory {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly Instance: FactoryInstance<IService> = new FactoryInstance<IService>(
		"service"
	);
}
