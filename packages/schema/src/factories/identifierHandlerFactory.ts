// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory, Urn } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IIdentifierHandler } from "../models/IIdentifierHandler";

/**
 * Factory for creating handlers for identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentifierHandlerFactory = Factory.createFactory<IIdentifierHandler>(
	"namespace",
	true,
	(names: string[], uri: string) => {
		Urn.guard(nameof(IdentifierHandlerFactory), nameof(uri), uri);

		const urn = Urn.fromValidString(uri);
		const urnParts = [urn.namespaceIdentifier(), ...urn.namespaceSpecific()];

		for (let i = urnParts.length - 1; i >= 0; i--) {
			const wholeNamespace = urnParts.slice(i).join(":");
			if (names.includes(wholeNamespace)) {
				return wholeNamespace;
			}
		}
	}
);
