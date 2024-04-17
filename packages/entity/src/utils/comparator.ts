// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is } from "@gtsc/core";
import { ComparisonType } from "../models/comparisonType";
import type { IComparator } from "../models/IComparator";
import type { IComparatorGroup } from "../models/IComparatorGroup";
import { LogicalOperator } from "../models/logicalOperator";

/**
 * Class to perform comparison operations using comparators.
 */
export class Comparator {
	/**
	 * See if the entity matches the comparators.
	 * @param entity The entity to test.
	 * @param comparator The conditions to test.
	 * @returns True if the entity matches.
	 */
	public static testConditions<T>(
		entity: T,
		comparator?: IComparator<T> | IComparatorGroup<T>
	): boolean {
		// If no comparators are defined then it's a match
		if (Is.undefined(comparator)) {
			return true;
		}

		if ("comparators" in comparator) {
			// It's a group of conditions, so check the individual items and combine with the logical operator
			const results: boolean[] = comparator.comparators.map(c => this.testConditions(entity, c));
			if ((comparator.logicalOperator ?? LogicalOperator.And) === LogicalOperator.And) {
				return results.every(Boolean);
			}
			return results.some(Boolean);
		}

		// It's a single value so just check the condition
		return Comparator.testCondition(entity, comparator);
	}

	/**
	 * See if the entity matches the comparator.
	 * @param entity The entity to test.
	 * @param comparator The condition to test.
	 * @returns True if the entity matches.
	 */
	public static testCondition<T>(entity: T, comparator: IComparator<T>): boolean {
		const val = entity[comparator.property];
		const conditionValue = comparator.value;

		if (Is.undefined(conditionValue)) {
			const valUndefined = Is.undefined(val);
			if (valUndefined && comparator.comparison === ComparisonType.Equals) {
				return true;
			} else if (!valUndefined && comparator.comparison === ComparisonType.NotEquals) {
				return true;
			}
			return false;
		} else if (Is.string(val)) {
			if (Is.string(conditionValue)) {
				if (
					!(
						(comparator.comparison === ComparisonType.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonType.NotEquals && val !== conditionValue) ||
						(comparator.comparison === ComparisonType.GreaterThan && val > conditionValue) ||
						(comparator.comparison === ComparisonType.LessThan && val < conditionValue) ||
						(comparator.comparison === ComparisonType.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.comparison === ComparisonType.LessThanOrEqual && val <= conditionValue) ||
						(comparator.comparison === ComparisonType.Includes && val.includes(conditionValue)) ||
						(comparator.comparison === ComparisonType.NotIncludes && !val.includes(conditionValue))
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
						(comparator.comparison === ComparisonType.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonType.NotEquals && val !== conditionValue) ||
						(comparator.comparison === ComparisonType.GreaterThan && val > conditionValue) ||
						(comparator.comparison === ComparisonType.LessThan && val < conditionValue) ||
						(comparator.comparison === ComparisonType.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.comparison === ComparisonType.LessThanOrEqual && val <= conditionValue)
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
						(comparator.comparison === ComparisonType.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonType.NotEquals && val !== conditionValue)
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
					comparator.comparison === ComparisonType.Equals ||
					comparator.comparison === ComparisonType.NotEquals
				) {
					const matches = ArrayHelper.matches(val, conditionValue);
					if (
						!(
							(comparator.comparison === ComparisonType.Equals && matches) ||
							(comparator.comparison === ComparisonType.NotEquals && !matches)
						)
					) {
						return false;
					}
					return true;
				}
				return false;
			} else if (Is.number(conditionValue) || Is.string(conditionValue)) {
				if (
					comparator.comparison === ComparisonType.Includes ||
					comparator.comparison === ComparisonType.NotIncludes ||
					comparator.comparison === ComparisonType.In ||
					comparator.comparison === ComparisonType.NotIn
				) {
					const includes = val.includes(conditionValue);
					if (
						!(
							(comparator.comparison === ComparisonType.Includes && includes) ||
							(comparator.comparison === ComparisonType.NotIncludes && !includes) ||
							(comparator.comparison === ComparisonType.In && includes) ||
							(comparator.comparison === ComparisonType.NotIn && !includes)
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
