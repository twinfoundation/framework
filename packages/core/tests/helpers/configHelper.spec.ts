// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ConfigHelper } from "../../src/helpers/configHelper";

describe("ConfigHelper", () => {
	test("can fail silently to substitute a missing string environment variable", () => {
		expect(
			ConfigHelper.substituteEnvironment(
				`{
            "prop": "__ENV_S_FRED__"
            }`,
				{}
			)
		).toMatchObject({ prop: "__ENV_S_FRED__" });
	});

	test("can fail silently to substitute a missing number environment variable", () => {
		expect(
			ConfigHelper.substituteEnvironment(
				`{
                "prop": "__ENV_N_FRED__"
            }`,
				{}
			)
		).toMatchObject({ prop: "__ENV_N_FRED__" });
	});

	test("can fail silently to substitute a missing boolean environment variable", () => {
		expect(
			ConfigHelper.substituteEnvironment(
				`{
                "prop": "__ENV_B_FRED__"
            }`,
				{}
			)
		).toMatchObject({ prop: "__ENV_B_FRED__" });
	});

	test("can substitute an environment variable to embedded string config", () => {
		expect(
			ConfigHelper.substituteEnvironment('{ "p": "foo__ENV_S_FRED__foo" }', { FRED: "bar" })
		).toMatchObject({
			p: "foobarfoo"
		});
	});

	test("can substitute an environment variable to embedded number config", () => {
		expect(
			ConfigHelper.substituteEnvironment('{ "p": "__ENV_N_FRED__" }', { FRED: "100" })
		).toMatchObject({
			p: 100
		});
	});

	test("can substitute an environment variable to embedded boolean config", () => {
		expect(
			ConfigHelper.substituteEnvironment('{ "p": "__ENV_B_FRED__" }', { FRED: "false" })
		).toMatchObject({
			p: false
		});
	});
});
