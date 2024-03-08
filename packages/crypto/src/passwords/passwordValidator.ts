// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { type IValidationFailure, Validation } from "@gtsc/core";

/**
 * Test password strength.
 * Ref https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls .
 */
export class PasswordValidator {
	/**
	 * Test the strength of the password.
	 * @param property The name of the property.
	 * @param password The password to test.
	 * @param failures The list of failures to add to.
	 * @param options Options to configure the testing.
	 * @param options.minLength The minimum length of the password, defaults to 8.
	 * @param options.maxLength The minimum length of the password, defaults to 128.
	 * @param options.minPhraseLength The minimum length of the password for it to be considered a pass phrase.
	 */
	public static validate(
		property: string,
		password: string,
		failures: IValidationFailure[],
		options?: {
			minLength?: number;
			maxLength?: number;
			minPhraseLength?: number;
		}
	): void {
		const isString = Validation.stringValue(property, password, failures);

		if (isString) {
			const minLength = options?.minLength ?? 8;
			if (password.length < minLength) {
				failures.push({
					property,
					reason: "validation.minLengthRequired",
					properties: {
						minLength
					}
				});
			}

			const maxLength = options?.maxLength ?? 128;
			if (password.length > maxLength) {
				failures.push({
					property,
					reason: "validation.maxLengthRequired",
					properties: {
						maxLength
					}
				});
			}

			if (/(.)\1{2,}/.test(password)) {
				failures.push({
					property,
					reason: "validation.repeatedCharacters"
				});
			}

			// If this looks like a phrase then apply additional rules
			const minPhraseLength = options?.minPhraseLength ?? 20;

			if (password.length < minPhraseLength || !password.includes(" ")) {
				if (!/[a-z]/.test(password)) {
					failures.push({
						property,
						reason: "validation.atLeastOneLowerCase"
					});
				}

				if (!/[A-Z]/.test(password)) {
					failures.push({
						property,
						reason: "validation.atLeastOneUpperCase"
					});
				}

				if (!/\d/.test(password)) {
					failures.push({
						property,
						reason: "validation.atLeastOneNumber"
					});
				}

				if (!/[^\dA-Za-z]/.test(password)) {
					failures.push({
						property,
						reason: "validation.atLeastOneSpecialChar"
					});
				}
			}
		}
	}
}
