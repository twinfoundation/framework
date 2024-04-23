// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Standard HTTP status codes.
 */
export class HttpStatusCodes {
	/**
	 * Success.
	 */
	public static SUCCESS: number = 200;

	/**
	 * Created.
	 */
	public static CREATED: number = 201;

	/**
	 * Accepted.
	 */
	public static ACCEPTED: number = 202;

	/**
	 * No content.
	 */
	public static NO_CONTENT: number = 204;

	/**
	 * Bad Request error code.
	 */
	public static BAD_REQUEST: number = 400;

	/**
	 * Unauthorized error code.
	 */
	public static UNAUTHORIZED: number = 401;

	/**
	 * Forbidden error code.
	 */
	public static FORBIDDEN: number = 403;

	/**
	 * Not found error code.
	 */
	public static NOT_FOUND: number = 404;

	/**
	 * Conflict error code.
	 */
	public static CONFLICT: number = 409;

	/**
	 * Unprocessable Entity error code.
	 */
	public static UNPROCESSABLE_ENTITY: number = 422;

	/**
	 * Internal server error error code.
	 */
	public static INTERNAL_SERVER_ERROR: number = 500;

	/**
	 * Service unavailable error code.
	 */
	public static SERVICE_UNAVAILABLE: number = 503;
}
