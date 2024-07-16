// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComparator } from "./IComparator";
import type { IComparatorGroup } from "./IComparatorGroup";
import type { IComparatorProperty } from "./IComparatorProperty";

/**
 * Type defining condition for entities filtering.
 */
export type EntityCondition<T> = IComparator<T> | IComparatorGroup<T> | IComparatorProperty<T>;
