// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComparator } from "./IComparator";
import type { IComparatorGroup } from "./IComparatorGroup";

/**
 * Type defining condition.
 */
export type Condition<T> = IComparator<T> | IComparatorGroup<T>;
