// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is, ObjectHelper } from "@twin.org/core";
import { ComparisonOperator } from "../models/comparisonOperator";
import type { EntityCondition } from "../models/entityCondition";
import type { IComparator } from "../models/IComparator";
import { LogicalOperator } from "../models/logicalOperator";

/**
 * Class to perform condition checks.
 */
export class EntityConditions {
	/**
	 * See if the entity matches the conditions.
	 * @param entity The entity to test.
	 * @param condition The conditions to test.
	 * @returns True if the entity matches.
	 */
	public static check<T>(entity: T, condition?: EntityCondition<T>): boolean {
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

		if (condition.property.includes(".")) {
			// It's a child property comparison, so evaluate the child property
			// and then compare it to the conditions
			const path = condition.property.split(".");

			const child = ObjectHelper.propertyGet(entity, path[0]);

			// If the child is an array then check each item
			if (Is.array(child)) {
				for (const c of child) {
					const check = EntityConditions.check(c, {
						...condition,
						property: path.slice(1).join(".")
					});
					if (check) {
						return true;
					}
				}
				return false;
			}
		}

		// It's a single value so just check the condition
		return EntityConditions.compare(entity, condition);
	}

	/**
	 * See if the entity matches the conditions.
	 * @param entity The entity to test.
	 * @param comparator The condition to test.
	 * @returns True if the entity matches.
	 */
	public static compare<T>(entity: T, comparator: IComparator): boolean {
		const val = ObjectHelper.propertyGet(entity, comparator.property);
		const conditionValue = comparator.value;

		if (Is.undefined(conditionValue)) {
			const valUndefined = Is.undefined(val);
			if (valUndefined && comparator.comparison === ComparisonOperator.Equals) {
				return true;
			} else if (!valUndefined && comparator.comparison === ComparisonOperator.NotEquals) {
				return true;
			}
			return false;
		} else if (Is.string(val)) {
			if (Is.string(conditionValue)) {
				if (
					!(
						(comparator.comparison === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonOperator.NotEquals && val !== conditionValue) ||
						(comparator.comparison === ComparisonOperator.GreaterThan && val > conditionValue) ||
						(comparator.comparison === ComparisonOperator.LessThan && val < conditionValue) ||
						(comparator.comparison === ComparisonOperator.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.comparison === ComparisonOperator.LessThanOrEqual &&
							val <= conditionValue) ||
						(comparator.comparison === ComparisonOperator.Includes &&
							val.includes(conditionValue)) ||
						(comparator.comparison === ComparisonOperator.NotIncludes &&
							!val.includes(conditionValue))
					)
				) {
					return false;
				}
				return true;
			} else if (Is.array(conditionValue)) {
				if (!(comparator.comparison === ComparisonOperator.In && conditionValue.includes(val))) {
					return false;
				}
				return true;
			}
			return false;
		} else if (Is.number(val)) {
			if (Is.number(conditionValue)) {
				if (
					!(
						(comparator.comparison === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonOperator.NotEquals && val !== conditionValue) ||
						(comparator.comparison === ComparisonOperator.GreaterThan && val > conditionValue) ||
						(comparator.comparison === ComparisonOperator.LessThan && val < conditionValue) ||
						(comparator.comparison === ComparisonOperator.GreaterThanOrEqual &&
							val >= conditionValue) ||
						(comparator.comparison === ComparisonOperator.LessThanOrEqual && val <= conditionValue)
					)
				) {
					return false;
				}
				return true;
			} else if (Is.array(conditionValue)) {
				if (!(comparator.comparison === ComparisonOperator.In && conditionValue.includes(val))) {
					return false;
				}
				return true;
			}
			return false;
		} else if (Is.boolean(val)) {
			if (Is.boolean(conditionValue)) {
				if (
					!(
						(comparator.comparison === ComparisonOperator.Equals && val === conditionValue) ||
						(comparator.comparison === ComparisonOperator.NotEquals && val !== conditionValue)
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
					comparator.comparison === ComparisonOperator.Equals ||
					comparator.comparison === ComparisonOperator.NotEquals
				) {
					const matches = ArrayHelper.matches(val, conditionValue);
					if (
						!(
							(comparator.comparison === ComparisonOperator.Equals && matches) ||
							(comparator.comparison === ComparisonOperator.NotEquals && !matches)
						)
					) {
						return false;
					}
					return true;
				}
				return false;
			} else if (Is.number(conditionValue) || Is.string(conditionValue)) {
				if (
					comparator.comparison === ComparisonOperator.Includes ||
					comparator.comparison === ComparisonOperator.NotIncludes ||
					comparator.comparison === ComparisonOperator.In
				) {
					const includes = val.includes(conditionValue);
					if (
						!(
							(comparator.comparison === ComparisonOperator.Includes && includes) ||
							(comparator.comparison === ComparisonOperator.NotIncludes && !includes) ||
							(comparator.comparison === ComparisonOperator.In && includes)
						)
					) {
						return false;
					}
					return true;
				}
				return false;
			} else if (Is.object(conditionValue)) {
				if (comparator.comparison === ComparisonOperator.Includes) {
					for (const v of val) {
						if (ObjectHelper.equal(v, conditionValue)) {
							return true;
						}
					}
				} else if (comparator.comparison === ComparisonOperator.NotIncludes) {
					for (const v of val) {
						if (!ObjectHelper.equal(v, conditionValue)) {
							return true;
						}
					}
				}
			}
			return false;
		}

		return false;
	}
}
