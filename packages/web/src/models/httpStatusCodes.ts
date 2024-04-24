// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Standard HTTP status codes.
 */
export class HttpStatusCodes {
	/**
	 * Continue status code.
	 */
	public static CONTINUE: number = 100;

	/**
	 * Switching Protocols status code.
	 */
	public static SWITCHING_PROTOCOLS: number = 101;

	/**
	 * Processing status code.
	 */
	public static PROCESSING: number = 102;

	/**
	 * Early Hints status code.
	 */
	public static EARLY_HINTS: number = 103;

	/**
	 * OK status code.
	 */
	public static OK: number = 200;

	/**
	 * Created status code.
	 */
	public static CREATED: number = 201;

	/**
	 * Accepted status code.
	 */
	public static ACCEPTED: number = 202;

	/**
	 * Non-Authoritative Information status code.
	 */
	public static NON_AUTHORITATIVE_INFORMATION: number = 203;

	/**
	 * No Content status code.
	 */
	public static NO_CONTENT: number = 204;

	/**
	 * Reset Content status code.
	 */
	public static RESET_CONTENT: number = 205;

	/**
	 * Partial Content status code.
	 */
	public static PARTIAL_CONTENT: number = 206;

	/**
	 * Multi-Status status code.
	 */
	public static MULTI_STATUS: number = 207;

	/**
	 * Already Reported status code.
	 */
	public static ALREADY_REPORTED: number = 208;

	/**
	 * IM Used status code.
	 */
	public static IM_USED: number = 226;

	/**
	 * Multiple Choices status code.
	 */
	public static MULTIPLE_CHOICES: number = 300;

	/**
	 * Moved Permanently status code.
	 */
	public static MOVED_PERMANENTLY: number = 301;

	/**
	 * Found status code.
	 */
	public static FOUND: number = 302;

	/**
	 * See Other status code.
	 */
	public static SEE_OTHER: number = 303;

	/**
	 * Not Modified status code.
	 */
	public static NOT_MODIFIED: number = 304;

	/**
	 * Use Proxy status code.
	 */
	public static USE_PROXY: number = 305;

	/**
	 * Temporary Redirect status code.
	 */
	public static TEMPORARY_REDIRECT: number = 307;

	/**
	 * Permanent Redirect status code.
	 */
	public static PERMANENT_REDIRECT: number = 308;

	/**
	 * Bad Request status code.
	 */
	public static BAD_REQUEST: number = 400;

	/**
	 * Unauthorized status code.
	 */
	public static UNAUTHORIZED: number = 401;

	/**
	 * Payment Required status code.
	 */
	public static PAYMENT_REQUIRED: number = 402;

	/**
	 * Forbidden status code.
	 */
	public static FORBIDDEN: number = 403;

	/**
	 * Not Found status code.
	 */
	public static NOT_FOUND: number = 404;

	/**
	 * Method Not Allowed status code.
	 */
	public static METHOD_NOT_ALLOWED: number = 405;

	/**
	 * Not Acceptable status code.
	 */
	public static NOT_ACCEPTABLE: number = 406;

	/**
	 * Proxy Authentication Required status code.
	 */
	public static PROXY_AUTHENTICATION_REQUIRED: number = 407;

	/**
	 * Request Timeout status code.
	 */
	public static REQUEST_TIMEOUT: number = 408;

	/**
	 * Conflict status code.
	 */
	public static CONFLICT: number = 409;

	/**
	 * Gone status code.
	 */
	public static GONE: number = 410;

	/**
	 * Length Required status code.
	 */
	public static LENGTH_REQUIRED: number = 411;

	/**
	 * Precondition Failed status code.
	 */
	public static PRECONDITION_FAILED: number = 412;

	/**
	 * Payload Too Large status code.
	 */
	public static PAYLOAD_TOO_LARGE: number = 413;

	/**
	 * URI Too Long status code.
	 */
	public static URI_TOO_LONG: number = 414;

	/**
	 * Unsupported Media Type status code.
	 */
	public static UNSUPPORTED_MEDIA_TYPE: number = 415;

	/**
	 * Range Not Satisfiable status code.
	 */
	public static RANGE_NOT_SATISFIABLE: number = 416;

	/**
	 * Expectation Failed status code.
	 */
	public static EXPECTATION_FAILED: number = 417;

	/**
	 * I'm a teapot status code.
	 */
	public static IM_A_TEAPOT: number = 418;

	/**
	 * Misdirected Request status code.
	 */
	public static MISDIRECTED_REQUEST: number = 421;

	/**
	 * Unprocessable Entity status code.
	 */
	public static UNPROCESSABLE_ENTITY: number = 422;

	/**
	 * Locked status code.
	 */
	public static LOCKED: number = 423;

	/**
	 * Failed Dependency status code.
	 */
	public static FAILED_DEPENDENCY: number = 424;

	/**
	 * Too Early status code.
	 */
	public static TOO_EARLY: number = 425;

	/**
	 * Upgrade Required status code.
	 */
	public static UPGRADE_REQUIRED: number = 426;

	/**
	 * Precondition Required status code.
	 */
	public static PRECONDITION_REQUIRED: number = 428;

	/**
	 * Too Many Requests status code.
	 */
	public static TOO_MANY_REQUESTS: number = 429;

	/**
	 * Request Header Fields Too Large status code.
	 */
	public static REQUEST_HEADER_FIELDS_TOO_LARGE: number = 431;

	/**
	 * Unavailable For Legal Reasons status code.
	 */
	public static UNAVAILABLE_FOR_LEGAL_REASONS: number = 451;

	/**
	 * Internal Server Error status code.
	 */
	public static INTERNAL_SERVER_ERROR: number = 500;

	/**
	 * Not Implemented status code.
	 */
	public static NOT_IMPLEMENTED: number = 501;

	/**
	 * Bad Gateway status code.
	 */
	public static BAD_GATEWAY: number = 502;

	/**
	 * Service Unavailable status code.
	 */
	public static SERVICE_UNAVAILABLE: number = 503;

	/**
	 * Gateway Timeout status code.
	 */
	public static GATEWAY_TIMEOUT: number = 504;

	/**
	 * HTTP Version Not Supported status code.
	 */
	public static HTTP_VERSION_NOT_SUPPORTED: number = 505;

	/**
	 * Variant Also Negotiates status code.
	 */
	public static VARIANT_ALSO_NEGOTIATES: number = 506;

	/**
	 * Insufficient Storage status code.
	 */
	public static INSUFFICIENT_STORAGE: number = 507;

	/**
	 * Loop Detected status code.
	 */
	public static LOOP_DETECTED: number = 508;

	/**
	 * Not Extended status code.
	 */
	public static NOT_EXTENDED: number = 510;

	/**
	 * Network Authentication Required status code.
	 */
	public static NETWORK_AUTHENTICATION_REQUIRED: number = 511;
}
