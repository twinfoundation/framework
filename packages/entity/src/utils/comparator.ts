// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is } from "@gtsc/core";
import { ComparisonType } from "../models/comparisonType.js";
import type { IComparator } from "../models/IComparator.js";
import { LogicalOperator } from "../models/logicalOperator.js";

/**
 * Class to perform comparison operations using comparators.
 */
export class Comparator {
	/**
	 * See if the entity matches the comparators.
	 * @param entity The entity to test.
	 * @param comparators The conditions to test.
	 * @returns True if the entity matches.
	 */
	public static testConditions<T extends object>(entity: T, comparators?: IComparator[]): boolean {
		if (!Is.arrayValue(comparators)) {
			return true;
		}

		const results: boolean[] = [];

		for (let i = 0; i < comparators.length; i++) {
			if (!(comparators[i].property in entity)) {
				results.push(false);
			}
			const val = entity[comparators[i].property as keyof T];
			const conditionValue = comparators[i].value;

			if (Is.string(val)) {
				if (Is.string(conditionValue)) {
					if (
						!(
							(comparators[i].comparison === ComparisonType.Equals && val === conditionValue) ||
							(comparators[i].comparison === ComparisonType.NotEquals && val !== conditionValue) ||
							(comparators[i].comparison === ComparisonType.GreaterThan && val > conditionValue) ||
							(comparators[i].comparison === ComparisonType.LessThan && val < conditionValue) ||
							(comparators[i].comparison === ComparisonType.GreaterThanOrEqual &&
								val >= conditionValue) ||
							(comparators[i].comparison === ComparisonType.LessThanOrEqual &&
								val <= conditionValue) ||
							(comparators[i].comparison === ComparisonType.Includes &&
								val.includes(conditionValue)) ||
							(comparators[i].comparison === ComparisonType.NotIncludes &&
								!val.includes(conditionValue))
						)
					) {
						results.push(false);
					} else {
						results.push(true);
					}
				} else {
					results.push(false);
				}
			} else if (Is.number(val)) {
				if (Is.number(conditionValue)) {
					if (
						!(
							(comparators[i].comparison === ComparisonType.Equals && val === conditionValue) ||
							(comparators[i].comparison === ComparisonType.NotEquals && val !== conditionValue) ||
							(comparators[i].comparison === ComparisonType.GreaterThan && val > conditionValue) ||
							(comparators[i].comparison === ComparisonType.LessThan && val < conditionValue) ||
							(comparators[i].comparison === ComparisonType.GreaterThanOrEqual &&
								val >= conditionValue) ||
							(comparators[i].comparison === ComparisonType.LessThanOrEqual &&
								val <= conditionValue)
						)
					) {
						results.push(false);
					} else {
						results.push(true);
					}
				} else {
					results.push(false);
				}
			} else if (Is.boolean(val)) {
				if (Is.boolean(conditionValue)) {
					if (
						!(
							(comparators[i].comparison === ComparisonType.Equals && val === conditionValue) ||
							(comparators[i].comparison === ComparisonType.NotEquals && val !== conditionValue)
						)
					) {
						results.push(false);
					} else {
						results.push(true);
					}
				} else {
					results.push(false);
				}
			} else if (Is.array(val)) {
				if (Is.array(conditionValue)) {
					if (
						comparators[i].comparison === ComparisonType.Equals ||
						comparators[i].comparison === ComparisonType.NotEquals
					) {
						const matches = ArrayHelper.matches(val, conditionValue);
						if (
							!(
								(comparators[i].comparison === ComparisonType.Equals && matches) ||
								(comparators[i].comparison === ComparisonType.NotEquals && !matches)
							)
						) {
							results.push(false);
						} else {
							results.push(true);
						}
					} else {
						results.push(false);
					}
				} else if (Is.number(conditionValue) || Is.string(conditionValue)) {
					if (
						comparators[i].comparison === ComparisonType.Includes ||
						comparators[i].comparison === ComparisonType.NotIncludes
					) {
						const includes = val.includes(conditionValue);
						if (
							!(
								(comparators[i].comparison === ComparisonType.Includes && includes) ||
								(comparators[i].comparison === ComparisonType.NotIncludes && !includes)
							)
						) {
							results.push(false);
						} else {
							results.push(true);
						}
					} else {
						results.push(false);
					}
				} else {
					results.push(false);
				}
			}
		}

		let currentLogicalOperator: LogicalOperator = LogicalOperator.AND;

		let result = results[0];
		for (let i = 0; i < results.length; i++) {
			const val = results[i];

			if (i !== 0) {
				if (currentLogicalOperator === LogicalOperator.AND) {
					result = result && val;
				}
				if (currentLogicalOperator === LogicalOperator.OR) {
					result = result || val;
				}
			}

			currentLogicalOperator = comparators[i].logicalOperator ?? LogicalOperator.AND;
		}

		return result;
	}
}
