// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is } from "@gtsc/core";
import { ComparisonOperator } from "../models/comparisonOperator";
import type { Condition } from "../models/condition";
import type { IComparator } from "../models/IComparator";
import { LogicalOperator } from "../models/logicalOperator";

/**
 * Class to perform condition checks.
 */
export class Conditions {
	/**
	 * See if the entity matches the conditions.
	 * @param entity The entity to test.
	 * @param condition The conditions to test.
	 * @returns True if the entity matches.
	 */
	public static check<T>(entity: T, condition?: Condition<T>): boolean {
		// If no conditions are defined then it's a match
		if (Is.undefined(condition)) {
			return true;
		}

		if ("conditions" in condition) {
			// It's a group of comparisons, so check the individual items and combine with the logical operator
			const results: boolean[] = condition.conditions.map(c => this.check(entity, c));
			if ((condition.logicalOperator ?? LogicalOperator.And) === LogicalOperator.And) {
				return results.every(Boolean);
			}
			return results.some(Boolean);
		}

		// It's a single value so just check the condition
		return Conditions.compare(entity, condition);
	}

	/**
	 * See if the entity matches the conditions.
	 * @param entity The entity to test.
	 * @param comparator The condition to test.
	 * @returns True if the entity matches.
	 */
	public static compare<T>(entity: T, comparator: IComparator<T>): boolean {
		const val = entity[comparator.property];
		const conditionValue = comparator.value;

		if (Is.undefined(conditionValue)) {
			const valUndefined = Is.undefined(val);
			if (valUndefined && comparator.operator === ComparisonOperator.Equals) {
				return true;
			} else if (!valUndefined && comparator.operator === ComparisonOperator.NotEquals) {
				return true;
			}
			return false;
		} else if (Is.string(val)) {
			if (Is.string(conditionValue)) {
				if (
					!(
						(comparator.operator === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.operator === ComparisonOperator.NotEquals && val !== conditionValue) ||
						(comparator.operator === ComparisonOperator.GreaterThan && val > conditionValue) ||
						(comparator.operator === ComparisonOperator.LessThan && val < conditionValue) ||
						(comparator.operator === ComparisonOperator.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.operator === ComparisonOperator.LessThanOrEqual && val <= conditionValue) ||
						(comparator.operator === ComparisonOperator.Includes && val.includes(conditionValue)) ||
						(comparator.operator === ComparisonOperator.NotIncludes &&
							!val.includes(conditionValue))
					)
				) {
					return false;
				}
				return true;
			}
			return false;
		} else if (Is.number(val)) {
			if (Is.number(conditionValue)) {
				if (
					!(
						(comparator.operator === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.operator === ComparisonOperator.NotEquals && val !== conditionValue) ||
						(comparator.operator === ComparisonOperator.GreaterThan && val > conditionValue) ||
						(comparator.operator === ComparisonOperator.LessThan && val < conditionValue) ||
						(comparator.operator === ComparisonOperator.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.operator === ComparisonOperator.LessThanOrEqual && val <= conditionValue)
					)
				) {
					return false;
				}
				return true;
			}
			return false;
		} else if (Is.boolean(val)) {
			if (Is.boolean(conditionValue)) {
				if (
					!(
						(comparator.operator === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.operator === ComparisonOperator.NotEquals && val !== conditionValue)
					)
				) {
					return false;
				}
				return true;
			}
			return false;
		} else if (Is.array(val)) {
			if (Is.array(conditionValue)) {
				if (
					comparator.operator === ComparisonOperator.Equals ||
					comparator.operator === ComparisonOperator.NotEquals
				) {
					const matches = ArrayHelper.matches(val, conditionValue);
					if (
						!(
							(comparator.operator === ComparisonOperator.Equals && matches) ||
							(comparator.operator === ComparisonOperator.NotEquals && !matches)
						)
					) {
						return false;
					}
					return true;
				}
				return false;
			} else if (Is.number(conditionValue) || Is.string(conditionValue)) {
				if (
					comparator.operator === ComparisonOperator.Includes ||
					comparator.operator === ComparisonOperator.NotIncludes ||
					comparator.operator === ComparisonOperator.In ||
					comparator.operator === ComparisonOperator.NotIn
				) {
					const includes = val.includes(conditionValue);
					if (
						!(
							(comparator.operator === ComparisonOperator.Includes && includes) ||
							(comparator.operator === ComparisonOperator.NotIncludes && !includes) ||
							(comparator.operator === ComparisonOperator.In && includes) ||
							(comparator.operator === ComparisonOperator.NotIn && !includes)
						)
					) {
						return false;
					}
					return true;
				}
				return false;
			}
			return false;
		}

		return false;
	}
}
