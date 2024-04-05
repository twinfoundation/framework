// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory, Urn } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IIdentifierHandler } from "../models/IIdentifierHandler";

/**
 * Factory for creating handlers for identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentifierHandlerFactory = new Factory<IIdentifierHandler>(
	"namespace",
	true,
	(names: string[], uri: string) => {
		Urn.guard(nameof(IdentifierHandlerFactory), nameof(uri), Urn.addPrefix(uri));

		const urnParts = Urn.fromValidString(uri).parts(true);

		console.log("names", names);
		console.log("urnParts", urnParts);

		for (let i = urnParts.length - 1; i >= 0; i--) {
			const wholeNamespace = urnParts.slice(i).join(":");
			console.log("wholeNamespace", wholeNamespace);
			if (names.includes(wholeNamespace)) {
				console.log("matches");
				return wholeNamespace;
			}
			console.log("no matches");
		}
	}
);
