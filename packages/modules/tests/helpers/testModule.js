// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
export const testMethod = () => 1;
export const testMethodAdd = (value1, value2) => value1 + value2;
export const testMethodAddAsync = async (value1, value2) => value1 * value2;
export const testValue = 2;
export const testMethodWithError = () => {
	throw new Error('This is a test error');
};
export const testMethodWithErrorAsync = async () => {
	throw new Error('This is a test error async');
};
