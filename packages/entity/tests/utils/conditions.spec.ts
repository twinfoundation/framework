// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComparisonOperator } from "../../src/models/comparisonOperator";
import type { IComparatorProperty } from "../../src/models/IComparatorProperty";
import { LogicalOperator } from "../../src/models/logicalOperator";
import { EntityConditions } from "../../src/utils/entityConditions";

describe("Conditions", () => {
	test("can match if conditions are undefined", async () => {
		expect(EntityConditions.check({}, undefined)).toEqual(true);
	});

	test("can match if conditions are empty", async () => {
		expect(EntityConditions.check({}, undefined)).toEqual(true);
	});

	test("can match if undefined condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: undefined },
				{
					property: "foo",
					value: undefined,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(true);
	});

	test("can match if undefined condition notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: undefined,
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(true);
	});

	test("can match if undefined condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: undefined,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can not match if string condition different type", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bar2" },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can not match if string condition not equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bar2" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can match if string condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bar" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(true);
	});

	test("can not match if string condition not notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bar2" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(true);
	});

	test("can match if string condition notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bar" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(false);
	});

	test("can match if string condition less than", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "b",
					operator: ComparisonOperator.LessThan
				}
			)
		).toEqual(true);
	});

	test("can not match if string condition less than", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.LessThan
				}
			)
		).toEqual(false);
	});

	test("can match if string condition less than or equal 1", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.LessThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can match if string condition less than or equal 2", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "aa",
					operator: ComparisonOperator.LessThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can match if string condition greater than", async () => {
		expect(
			EntityConditions.check(
				{ foo: "b" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.GreaterThan
				}
			)
		).toEqual(true);
	});

	test("can not match if string condition greater than", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.GreaterThan
				}
			)
		).toEqual(false);
	});

	test("can match if string condition greater than or equal 1", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.GreaterThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can match if string condition greater than or equal 2", async () => {
		expect(
			EntityConditions.check(
				{ foo: "aa" },
				{
					property: "foo",
					value: "a",
					operator: ComparisonOperator.GreaterThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can not match if string condition not contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bebar" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(true);
	});

	test("can match if string condition contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bebar" },
				{
					property: "foo",
					value: "bab",
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(false);
	});

	test("can not match if string condition not contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bebar" },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.NotIncludes
				}
			)
		).toEqual(false);
	});

	test("can match if string condition contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: "bebar" },
				{
					property: "foo",
					value: "bab",
					operator: ComparisonOperator.NotIncludes
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition different type", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can not match if number condition not equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can match if number condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition not notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(true);
	});

	test("can match if number condition notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(false);
	});

	test("can not match if number condition not greater than", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.GreaterThan
				}
			)
		).toEqual(false);
	});

	test("can match if number condition greater than", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.GreaterThan
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition not greater than or equal 1", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.GreaterThanOrEqual
				}
			)
		).toEqual(false);
	});

	test("can match if number condition greater than or equal 1", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.GreaterThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can match if number condition greater than or equal 2", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.GreaterThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition not less than", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.LessThan
				}
			)
		).toEqual(false);
	});

	test("can match if number condition less than", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.LessThan
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition not less than or equal 1", async () => {
		expect(
			EntityConditions.check(
				{ foo: 2 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.LessThanOrEqual
				}
			)
		).toEqual(false);
	});

	test("can match if number condition less than or equal 2", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 2,
					operator: ComparisonOperator.LessThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can match if number condition less than or equal 2", async () => {
		expect(
			EntityConditions.check(
				{ foo: 1 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.LessThanOrEqual
				}
			)
		).toEqual(true);
	});

	test("can not match if number condition never contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: 111 },
				{
					property: "foo",
					value: 1,
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(false);
	});

	test("can not match if boolean condition different type", async () => {
		expect(
			EntityConditions.check(
				{ foo: true },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can not match if boolean condition not equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: true },
				{
					property: "foo",
					value: false,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can match if boolean condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: true },
				{
					property: "foo",
					value: true,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(true);
	});

	test("can not match if boolean condition not notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: false },
				{
					property: "foo",
					value: true,
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(true);
	});

	test("can match if boolean condition notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: false },
				{
					property: "foo",
					value: false,
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(false);
	});

	test("can not match if number condition never contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: false },
				{
					property: "foo",
					value: false,
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition different type", async () => {
		expect(
			EntityConditions.check(
				{ foo: [] },
				{
					property: "foo",
					value: "bar",
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition not equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: [] },
				{
					property: "foo",
					value: [1],
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can match if array condition equals", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1] },
				{
					property: "foo",
					value: [1],
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(true);
	});

	test("can not match if array condition not notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1] },
				{
					property: "foo",
					value: [2],
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(true);
	});

	test("can match if array condition notequals", async () => {
		expect(
			EntityConditions.check(
				{ foo: [] },
				{
					property: "foo",
					value: [],
					operator: ComparisonOperator.NotEquals
				}
			)
		).toEqual(false);
	});

	test("can not match if array unknown comparison", async () => {
		expect(
			EntityConditions.check(
				{ foo: [] },
				{
					property: "foo",
					value: [],
					operator: ComparisonOperator.LessThan
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition does not contain", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 4,
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 3,
					operator: ComparisonOperator.Includes
				}
			)
		).toEqual(true);
	});

	test("can not match if array condition does contain", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 4,
					operator: ComparisonOperator.NotIncludes
				}
			)
		).toEqual(true);
	});

	test("can not match if array condition does not contains", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 3,
					operator: ComparisonOperator.NotIncludes
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition is not in", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 4,
					operator: ComparisonOperator.In
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition in", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 3,
					operator: ComparisonOperator.In
				}
			)
		).toEqual(true);
	});

	test("can not match if array condition does notin", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 4,
					operator: ComparisonOperator.NotIn
				}
			)
		).toEqual(true);
	});

	test("can not match if array condition does not notin", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: 3,
					operator: ComparisonOperator.NotIn
				}
			)
		).toEqual(false);
	});

	test("can not match if array condition value is not string or number", async () => {
		expect(
			EntityConditions.check(
				{ foo: [1, 2, 3] },
				{
					property: "foo",
					value: new Date(),
					operator: ComparisonOperator.NotIn
				}
			)
		).toEqual(false);
	});

	test("can not match if unknown type", async () => {
		expect(
			EntityConditions.check(
				{ foo: new Date() },
				{
					property: "foo",
					value: 3,
					operator: ComparisonOperator.Equals
				}
			)
		).toEqual(false);
	});

	test("can match if has multiple conditions", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a", val: 2 },
				{
					conditions: [
						{
							property: "foo",
							value: "a",
							operator: ComparisonOperator.Equals
						},
						{
							property: "val",
							value: 2,
							operator: ComparisonOperator.Equals
						}
					]
				}
			)
		).toEqual(true);
	});

	test("can not match if has multiple conditions", async () => {
		expect(
			EntityConditions.check(
				{ foo: "a", val: 3 },
				{
					conditions: [
						{
							property: "foo",
							value: "a",
							operator: ComparisonOperator.Equals
						},
						{
							property: "val",
							value: 2,
							operator: ComparisonOperator.Equals
						}
					],
					logicalOperator: LogicalOperator.And
				}
			)
		).toEqual(false);
	});

	test("can match with logical AND", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2 },
			{
				conditions: [
					{
						property: "foo",
						value: "a",
						operator: ComparisonOperator.Equals
					},
					{
						property: "val",
						value: 2,
						operator: ComparisonOperator.Equals
					}
				],
				logicalOperator: LogicalOperator.And
			}
		);

		expect(results).toEqual(true);
	});

	test("can match with logical OR", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2 },
			{
				conditions: [
					{
						property: "foo",
						value: "a",
						operator: ComparisonOperator.Equals
					},
					{
						property: "val",
						value: 3,
						operator: ComparisonOperator.Equals
					}
				],
				logicalOperator: LogicalOperator.Or
			}
		);

		expect(results).toEqual(true);
	});

	test("can match with both logical AND and OR", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2, age: 5 },
			{
				conditions: [
					{
						property: "foo",
						value: "b",
						operator: ComparisonOperator.Equals
					},
					{
						conditions: [
							{
								property: "val",
								value: 2,
								operator: ComparisonOperator.Equals
							},
							{
								property: "age",
								value: 9,
								operator: ComparisonOperator.Equals
							}
						],
						logicalOperator: LogicalOperator.And
					}
				],
				logicalOperator: LogicalOperator.Or
			}
		);

		expect(results).toEqual(false);
	});

	test("can match with both logical AND and OR", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2, age: 5 },
			{
				conditions: [
					{
						property: "foo",
						value: "b",
						operator: ComparisonOperator.Equals
					},
					{
						conditions: [
							{
								property: "val",
								value: 2,
								operator: ComparisonOperator.Equals
							},
							{
								property: "age",
								value: 9,
								operator: ComparisonOperator.Equals
							}
						],
						logicalOperator: LogicalOperator.Or
					}
				],
				logicalOperator: LogicalOperator.Or
			}
		);

		expect(results).toEqual(true);
	});

	test("can match with both logical AND and OR", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2, age: 5 },
			{
				conditions: [
					{
						property: "foo",
						value: "b",
						operator: ComparisonOperator.Equals
					},
					{
						conditions: [
							{
								property: "val",
								value: 2,
								operator: ComparisonOperator.Equals
							},
							{
								property: "age",
								value: 9,
								operator: ComparisonOperator.Equals
							}
						],
						logicalOperator: LogicalOperator.And
					}
				],
				logicalOperator: LogicalOperator.Or
			}
		);

		expect(results).toEqual(false);
	});

	test("can match with both logical AND and OR", async () => {
		const results = EntityConditions.check(
			{ foo: "a", val: 2, age: 9 },
			{
				conditions: [
					{
						property: "foo",
						value: "b",
						operator: ComparisonOperator.Equals
					},
					{
						conditions: [
							{
								property: "val",
								value: 2,
								operator: ComparisonOperator.Equals
							},
							{
								property: "age",
								value: 9,
								operator: ComparisonOperator.Equals
							}
						],
						logicalOperator: LogicalOperator.And
					}
				],
				logicalOperator: LogicalOperator.Or
			}
		);

		expect(results).toEqual(true);
	});

	test("can fail a child condition", async () => {
		const results = EntityConditions.check(
			{
				foo: {
					a: 1
				}
			},
			{
				property: "foo",
				condition: {
					conditions: [
						{
							property: "a",
							value: 2,
							operator: ComparisonOperator.Equals
						}
					],
					logicalOperator: LogicalOperator.And
				}
			}
		);

		expect(results).toEqual(false);
	});

	test("can check a child condition", async () => {
		const results = EntityConditions.check(
			{
				foo: {
					a: 1
				}
			},
			{
				property: "foo",
				condition: {
					conditions: [
						{
							property: "a",
							value: 1,
							operator: ComparisonOperator.Equals
						}
					],
					logicalOperator: LogicalOperator.And
				}
			}
		);

		expect(results).toEqual(true);
	});

	test("can fail to check a child condition for an array value", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: 1
					}
				]
			},
			{
				property: "foo",
				condition: {
					conditions: [
						{
							property: "a",
							value: 2,
							operator: ComparisonOperator.Equals
						}
					],
					logicalOperator: LogicalOperator.And
				}
			}
		);

		expect(results).toEqual(false);
	});

	test("can check a child condition for an array value", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: 1
					}
				]
			},
			{
				property: "foo",
				condition: {
					conditions: [
						{
							property: "a",
							value: 1,
							operator: ComparisonOperator.Equals
						}
					],
					logicalOperator: LogicalOperator.And
				}
			}
		);

		expect(results).toEqual(true);
	});

	test("can fail to check a child condition for an array value nested", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: [
							{
								b: 1
							}
						]
					}
				]
			},
			{
				property: "foo",
				condition: {
					property: "a",
					condition: {
						conditions: [
							{
								property: "b",
								value: 3,
								operator: ComparisonOperator.Equals
							}
						]
					}
				}
			}
		);

		expect(results).toEqual(false);
	});

	test("can check a child condition for an array value nested", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: [
							{
								b: 3
							}
						]
					}
				]
			},
			{
				property: "foo",
				condition: {
					property: "a",
					condition: {
						conditions: [
							{
								property: "b",
								value: 3,
								operator: ComparisonOperator.Equals
							}
						]
					}
				}
			}
		);

		expect(results).toEqual(true);
	});

	test("can check a child condition for an array value nested with multiple properties", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: [
							{
								b: 3,
								c: 4
							},
							{
								b: 5,
								c: 6
							}
						]
					}
				]
			},
			{
				property: "foo",
				condition: {
					property: "a",
					condition: {
						conditions: [
							{
								property: "b",
								value: 3,
								operator: ComparisonOperator.Equals
							},
							{
								property: "c",
								value: 4,
								operator: ComparisonOperator.Equals
							}
						]
					}
				}
			}
		);

		expect(results).toEqual(true);
	});

	test("can fail to check a child condition for an array value nested with multiple properties", async () => {
		const results = EntityConditions.check(
			{
				foo: [
					{
						a: [
							{
								b: 3,
								c: 4
							},
							{
								b: 5,
								c: 6
							}
						]
					}
				]
			},
			{
				property: "foo",
				condition: {
					property: "a",
					condition: {
						conditions: [
							{
								property: "b",
								value: 4,
								operator: ComparisonOperator.Equals
							},
							{
								property: "c",
								value: 4,
								operator: ComparisonOperator.Equals
							}
						]
					}
				}
			}
		);

		expect(results).toEqual(false);
	});

	test("can check a child condition with strict typing", async () => {
		/**
		 * Test type.
		 */
		interface TestType {
			/**
			 * Foo property
			 */
			foo: {
				a: {
					b: number;
					c: number;
				}[];
			}[];
		}

		const propComparator: IComparatorProperty<TestType["foo"][0], TestType["foo"][0]["a"][0]> = {
			property: "a",
			condition: {
				conditions: [
					{
						property: "b",
						value: 3,
						operator: ComparisonOperator.Equals
					},
					{
						property: "c",
						value: 4,
						operator: ComparisonOperator.Equals
					}
				]
			}
		};
		const results = EntityConditions.check<TestType>(
			{
				foo: [
					{
						a: [
							{
								b: 3,
								c: 4
							},
							{
								b: 5,
								c: 6
							}
						]
					}
				]
			},
			{
				property: "foo",
				condition: propComparator
			}
		);

		expect(results).toEqual(true);
	});

	test("can check a child condition with object properties", async () => {
		const results = EntityConditions.check(
			{
				properties: [
					{
						key: "role",
						value: "user"
					}
				]
			},
			{
				property: "properties",
				condition: {
					conditions: [
						{
							property: "key",
							value: "role",
							operator: ComparisonOperator.Equals
						},
						{
							property: "value",
							value: "user",
							operator: ComparisonOperator.Equals
						}
					]
				}
			}
		);

		expect(results).toEqual(true);
	});

	test("can fail to check a child condition with object properties", async () => {
		const results = EntityConditions.check(
			{
				properties: [
					{
						key: "role",
						value: "node"
					}
				]
			},
			{
				property: "properties",
				condition: {
					conditions: [
						{
							property: "key",
							value: "role",
							operator: ComparisonOperator.Equals
						},
						{
							property: "value",
							value: "user",
							operator: ComparisonOperator.Equals
						}
					]
				}
			}
		);

		expect(results).toEqual(false);
	});
});
