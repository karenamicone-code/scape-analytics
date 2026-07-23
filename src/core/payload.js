/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: payload.js
 * Version: 1.0.0
 *
 * Description:
 * Builds a standardized payload for every analytics event.
 * ============================================================================
 */

import {
	getTimestamp,
	getPageTitle,
	getPageURL,
	getPagePath,
	getHostname,
	getReferrer,
	getLanguage,
	getScreenResolution,
	getViewport,
	getDevice,
	getBrowser,
	getOS,
	getUTMs,
	sanitize,
} from './utils.js';

/**
 * Builds the base payload shared by all events.
 */
export function buildPayload(properties = {}) {
	const payload = {
		timestamp: getTimestamp(),

		page_title: getPageTitle(),

		page_url: getPageURL(),

		page_path: getPagePath(),

		page_host: getHostname(),

		referrer: getReferrer(),

		language: getLanguage(),

		screen_resolution: getScreenResolution(),

		viewport: getViewport(),

		browser: getBrowser(),

		operating_system: getOS(),

		device: getDevice(),

		...getUTMs(),

		...properties,
	};

	return sanitize(payload);
}
