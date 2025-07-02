// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NameOfPlugin } from "../src/nameOfPlugin";

describe("NameOfPlugin", () => {
	test("can transform code with nameof generics in it", () => {
		let code = "const name = nameof<MyType>();";

		code = NameOfPlugin.transform(code, "test.ts");

		expect(code).toEqual('const name = "MyType";');
	});

	test("can transform code with nameof generics subtype in it", () => {
		let code = "const name = nameof<MyType<TypeB>>();";

		code = NameOfPlugin.transform(code, "test.ts");

		expect(code).toEqual('const name = "MyType";');
	});

	test("can transform code with nameof param in it", () => {
		let code = "const name = nameof(MyType);";

		code = NameOfPlugin.transform(code, "test.ts");

		expect(code).toEqual('const name = "MyType";');
	});

	test("can transform code with nameof import", () => {
		let code = 'import { nameof } from "@twin.org/nameof";';

		code = NameOfPlugin.transform(code, "test.ts");

		expect(code).toEqual("");
	});
});
