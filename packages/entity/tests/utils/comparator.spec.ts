// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComparisonType } from "../../src/models/comparisonType";
import { LogicalOperator } from "../../src/models/logicalOperator";
import { Comparator } from "../../src/utils/comparator";

describe("Comparator", () => {
	test("can match if conditions are undefined", async () => {
		expect(Comparator.testConditions({}, undefined)).toEqual(true);
	});

	test("can match if conditions are empty", async () => {
		expect(Comparator.testConditions({}, [])).toEqual(true);
	});

	test("can not match if condition property name does not exist", async () => {
		expect(
			Comparator.testConditions({} as { foo: string }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can not match if string condition different type", async () => {
		expect(
			Comparator.testConditions({ foo: "bar2" }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can not match if string condition not equals", async () => {
		expect(
			Comparator.testConditions({ foo: "bar2" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can match if string condition equals", async () => {
		expect(
			Comparator.testConditions({ foo: "bar" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(true);
	});

	test("can not match if string condition not notequals", async () => {
		expect(
			Comparator.testConditions({ foo: "bar2" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(true);
	});

	test("can match if string condition notequals", async () => {
		expect(
			Comparator.testConditions({ foo: "bar" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(false);
	});

	test("can match if string condition less than", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "b",
					comparison: ComparisonType.LessThan
				}
			])
		).toEqual(true);
	});

	test("can not match if string condition less than", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.LessThan
				}
			])
		).toEqual(false);
	});

	test("can match if string condition less than or equal 1", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.LessThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can match if string condition less than or equal 2", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "aa",
					comparison: ComparisonType.LessThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can match if string condition greater than", async () => {
		expect(
			Comparator.testConditions({ foo: "b" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.GreaterThan
				}
			])
		).toEqual(true);
	});

	test("can not match if string condition greater than", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.GreaterThan
				}
			])
		).toEqual(false);
	});

	test("can match if string condition greater than or equal 1", async () => {
		expect(
			Comparator.testConditions({ foo: "a" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.GreaterThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can match if string condition greater than or equal 2", async () => {
		expect(
			Comparator.testConditions({ foo: "aa" }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.GreaterThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can not match if string condition not contains", async () => {
		expect(
			Comparator.testConditions({ foo: "bebar" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(true);
	});

	test("can match if string condition contains", async () => {
		expect(
			Comparator.testConditions({ foo: "bebar" }, [
				{
					property: "foo",
					value: "bab",
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(false);
	});

	test("can not match if string condition not contains", async () => {
		expect(
			Comparator.testConditions({ foo: "bebar" }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.NotIncludes
				}
			])
		).toEqual(false);
	});

	test("can match if string condition contains", async () => {
		expect(
			Comparator.testConditions({ foo: "bebar" }, [
				{
					property: "foo",
					value: "bab",
					comparison: ComparisonType.NotIncludes
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition different type", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can not match if number condition not equals", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can match if number condition equals", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition not notequals", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(true);
	});

	test("can match if number condition notequals", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(false);
	});

	test("can not match if number condition not greater than", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.GreaterThan
				}
			])
		).toEqual(false);
	});

	test("can match if number condition greater than", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.GreaterThan
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition not greater than or equal 1", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.GreaterThanOrEqual
				}
			])
		).toEqual(false);
	});

	test("can match if number condition greater than or equal 1", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.GreaterThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can match if number condition greater than or equal 2", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.GreaterThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition not less than", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.LessThan
				}
			])
		).toEqual(false);
	});

	test("can match if number condition less than", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.LessThan
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition not less than or equal 1", async () => {
		expect(
			Comparator.testConditions({ foo: 2 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.LessThanOrEqual
				}
			])
		).toEqual(false);
	});

	test("can match if number condition less than or equal 2", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 2,
					comparison: ComparisonType.LessThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can match if number condition less than or equal 2", async () => {
		expect(
			Comparator.testConditions({ foo: 1 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.LessThanOrEqual
				}
			])
		).toEqual(true);
	});

	test("can not match if number condition never contains", async () => {
		expect(
			Comparator.testConditions({ foo: 111 }, [
				{
					property: "foo",
					value: 1,
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(false);
	});

	test("can not match if boolean condition different type", async () => {
		expect(
			Comparator.testConditions({ foo: true }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can not match if boolean condition not equals", async () => {
		expect(
			Comparator.testConditions({ foo: true }, [
				{
					property: "foo",
					value: false,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can match if boolean condition equals", async () => {
		expect(
			Comparator.testConditions({ foo: true }, [
				{
					property: "foo",
					value: true,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(true);
	});

	test("can not match if boolean condition not notequals", async () => {
		expect(
			Comparator.testConditions({ foo: false }, [
				{
					property: "foo",
					value: true,
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(true);
	});

	test("can match if boolean condition notequals", async () => {
		expect(
			Comparator.testConditions({ foo: false }, [
				{
					property: "foo",
					value: false,
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(false);
	});

	test("can not match if number condition never contains", async () => {
		expect(
			Comparator.testConditions({ foo: false }, [
				{
					property: "foo",
					value: false,
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(false);
	});

	test("can not match if array condition different type", async () => {
		expect(
			Comparator.testConditions({ foo: [] }, [
				{
					property: "foo",
					value: "bar",
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can not match if array condition not equals", async () => {
		expect(
			Comparator.testConditions({ foo: [] }, [
				{
					property: "foo",
					value: [1],
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can match if array condition equals", async () => {
		expect(
			Comparator.testConditions({ foo: [1] }, [
				{
					property: "foo",
					value: [1],
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(true);
	});

	test("can not match if array condition not notequals", async () => {
		expect(
			Comparator.testConditions({ foo: [1] }, [
				{
					property: "foo",
					value: [2],
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(true);
	});

	test("can match if array condition notequals", async () => {
		expect(
			Comparator.testConditions({ foo: [] }, [
				{
					property: "foo",
					value: [],
					comparison: ComparisonType.NotEquals
				}
			])
		).toEqual(false);
	});

	test("can not match if array condition does not contain", async () => {
		expect(
			Comparator.testConditions({ foo: [1, 2, 3] }, [
				{
					property: "foo",
					value: 4,
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(false);
	});

	test("can not match if array condition contains", async () => {
		expect(
			Comparator.testConditions({ foo: [1, 2, 3] }, [
				{
					property: "foo",
					value: 3,
					comparison: ComparisonType.Includes
				}
			])
		).toEqual(true);
	});

	test("can not match if array condition does contain", async () => {
		expect(
			Comparator.testConditions({ foo: [1, 2, 3] }, [
				{
					property: "foo",
					value: 4,
					comparison: ComparisonType.NotIncludes
				}
			])
		).toEqual(true);
	});

	test("can not match if array condition does not contains", async () => {
		expect(
			Comparator.testConditions({ foo: [1, 2, 3] }, [
				{
					property: "foo",
					value: 3,
					comparison: ComparisonType.NotIncludes
				}
			])
		).toEqual(false);
	});

	test("can match if has multiple comparators", async () => {
		expect(
			Comparator.testConditions({ foo: "a", val: 2 }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.Equals
				},
				{
					property: "val",
					value: 2,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(true);
	});

	test("can not match if has multiple comparators", async () => {
		expect(
			Comparator.testConditions({ foo: "a", val: 3 }, [
				{
					property: "foo",
					value: "a",
					comparison: ComparisonType.Equals
				},
				{
					property: "val",
					value: 2,
					comparison: ComparisonType.Equals
				}
			])
		).toEqual(false);
	});

	test("can match with logical AND", async () => {
		const results = Comparator.testConditions({ foo: "a", val: 2 }, [
			{
				property: "foo",
				value: "a",
				comparison: ComparisonType.Equals,
				logicalOperator: LogicalOperator.AND
			},
			{
				property: "val",
				value: 2,
				comparison: ComparisonType.Equals
			}
		]);

		expect(results).toEqual(true);
	});

	test("can match with logical OR", async () => {
		const results = Comparator.testConditions({ foo: "a", val: 2 }, [
			{
				property: "foo",
				value: "a",
				comparison: ComparisonType.Equals,
				logicalOperator: LogicalOperator.OR
			},
			{
				property: "val",
				value: 3,
				comparison: ComparisonType.Equals
			}
		]);

		expect(results).toEqual(true);
	});

	test("can match with both logical AND and OR", async () => {
		const results = Comparator.testConditions({ foo: "a", val: 2, age: 5 }, [
			{
				property: "foo",
				value: "b",
				comparison: ComparisonType.Equals,
				logicalOperator: LogicalOperator.OR
			},
			{
				property: "val",
				value: 2,
				comparison: ComparisonType.Equals,
				logicalOperator: LogicalOperator.AND
			},
			{
				property: "age",
				value: 9,
				comparison: ComparisonType.Equals
			}
		]);

		expect(results).toEqual(false);
	});
});
