// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Standard HTTP status codes.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpStatusCode = {
	/**
	 * Continue status code.
	 */
	continue: 100,

	/**
	 * Switching Protocols status code.
	 */
	switchingProtocols: 101,

	/**
	 * Processing status code.
	 */
	processing: 102,

	/**
	 * Early Hints status code.
	 */
	earlyHints: 103,

	/**
	 * OK status code.
	 */
	ok: 200,

	/**
	 * Created status code.
	 */
	created: 201,

	/**
	 * Accepted status code.
	 */
	accepted: 202,

	/**
	 * Non-Authoritative Information status code.
	 */
	nonAuthoritativeInformation: 203,

	/**
	 * No Content status code.
	 */
	noContent: 204,

	/**
	 * Reset Content status code.
	 */
	resetContent: 205,

	/**
	 * Partial Content status code.
	 */
	partialContent: 206,

	/**
	 * Multi-Status status code.
	 */
	multiStatus: 207,

	/**
	 * Already Reported status code.
	 */
	alreadyReported: 208,

	/**
	 * IM Used status code.
	 */
	imUsed: 226,

	/**
	 * Multiple Choices status code.
	 */
	multipleChoices: 300,

	/**
	 * Moved Permanently status code.
	 */
	movedPermanently: 301,

	/**
	 * Found status code.
	 */
	found: 302,

	/**
	 * See Other status code.
	 */
	seeOther: 303,

	/**
	 * Not Modified status code.
	 */
	notModified: 304,

	/**
	 * Use Proxy status code.
	 */
	useProxy: 305,

	/**
	 * Temporary Redirect status code.
	 */
	temporaryRedirect: 307,

	/**
	 * Permanent Redirect status code.
	 */
	permanentRedirect: 308,

	/**
	 * Bad Request status code.
	 */
	badRequest: 400,

	/**
	 * Unauthorized status code.
	 */
	unauthorized: 401,

	/**
	 * Payment Required status code.
	 */
	paymentRequired: 402,

	/**
	 * Forbidden status code.
	 */
	forbidden: 403,

	/**
	 * Not Found status code.
	 */
	notFound: 404,

	/**
	 * Method Not Allowed status code.
	 */
	methodNotAllowed: 405,

	/**
	 * Not Acceptable status code.
	 */
	notAcceptable: 406,

	/**
	 * Proxy Authentication Required status code.
	 */
	proxyAuthenticationRequired: 407,

	/**
	 * Request Timeout status code.
	 */
	requestTimeout: 408,

	/**
	 * Conflict status code.
	 */
	conflict: 409,

	/**
	 * Gone status code.
	 */
	gone: 410,

	/**
	 * Length Required status code.
	 */
	lengthRequired: 411,

	/**
	 * Precondition Failed status code.
	 */
	preconditionFailed: 412,

	/**
	 * Payload Too Large status code.
	 */
	payloadTooLarge: 413,

	/**
	 * URI Too Long status code.
	 */
	uriTooLong: 414,

	/**
	 * Unsupported Media Type status code.
	 */
	unsupportedMediaType: 415,

	/**
	 * Range Not Satisfiable status code.
	 */
	rangeNotSatisfiable: 416,

	/**
	 * Expectation Failed status code.
	 */
	expectationFailed: 417,

	/**
	 * I'm a Teapot status code.
	 */
	imATeapot: 418,

	/**
	 * Misdirected Request status code.
	 */
	misdirectedRequest: 421,

	/**
	 * Unprocessable Entity status code.
	 */
	unprocessableEntity: 422,

	/**
	 * Locked status code.
	 */
	locked: 423,

	/**
	 * Failed Dependency status code.
	 */
	failedDependency: 424,

	/**
	 * Too Early status code.
	 */
	tooEarly: 425,

	/**
	 * Upgrade Required status code.
	 */
	upgradeRequired: 426,

	/**
	 * Precondition Required status code.
	 */
	preconditionRequired: 428,

	/**
	 * Too Many Requests status code.
	 */
	tooManyRequests: 429,

	/**
	 * Request Header Fields Too Large status code.
	 */
	requestHeaderFieldsTooLarge: 431,

	/**
	 * Unavailable For Legal Reasons status code.
	 */
	unavailableForLegalReasons: 451,

	/**
	 * Internal Server Error status code.
	 */
	internalServerError: 500,

	/**
	 * Not Implemented status code.
	 */
	notImplemented: 501,

	/**
	 * Bad Gateway status code.
	 */
	badGateway: 502,

	/**
	 * Service Unavailable status code.
	 */
	serviceUnavailable: 503,

	/**
	 * Gateway Timeout status code.
	 */
	gatewayTimeout: 504,

	/**
	 * HTTP Version Not Supported status code.
	 */
	httpVersionNotSupported: 505,

	/**
	 * Variant Also Negotiates status code.
	 */
	variantAlsoNegotiates: 506,

	/**
	 * Insufficient Storage status code.
	 */
	insufficientStorage: 507,

	/**
	 * Loop Detected status code.
	 */
	loopDetected: 508,

	/**
	 * Not Extended status code.
	 */
	notExtended: 510,

	/**
	 * Network Authentication Required status code.
	 */
	networkAuthenticationRequired: 511
} as const;

/**
 * Standard HTTP status codes.
 */
export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];
