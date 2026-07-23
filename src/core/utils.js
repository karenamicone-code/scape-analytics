/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: utils.js
 * Version: 1.0.0
 * Description:
 * Shared utility functions used across the SDK.
 * ============================================================================
 */

/**
 * Returns the current ISO timestamp.
 */
export function getTimestamp() {
	return new Date().toISOString();
}

/**
 * Returns the current page title.
 */
export function getPageTitle() {
	return document.title || '';
}

/**
 * Returns the current page URL.
 */
export function getPageURL() {
	return window.location.href;
}

/**
 * Returns the current page path.
 */
export function getPagePath() {
	return window.location.pathname;
}

/**
 * Returns the current hostname.
 */
export function getHostname() {
	return window.location.hostname;
}

/**
 * Returns the current referrer.
 */
export function getReferrer() {
	return document.referrer || '';
}

/**
 * Returns the browser language.
 */
export function getLanguage() {
	return navigator.language || navigator.userLanguage || 'unknown';
}

/**
 * Returns screen resolution.
 */
export function getScreenResolution() {
	return `${window.screen.width}x${window.screen.height}`;
}

/**
 * Returns viewport size.
 */
export function getViewport() {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
}

/**
 * Detect device type.
 */
export function getDevice() {
	const ua = navigator.userAgent;

	if (
		/iPad|Tablet/i.test(ua) ||
		(navigator.maxTouchPoints > 1 && window.innerWidth > 768)
	) {
		return 'Tablet';
	}

	if (/Mobi|Android|iPhone/i.test(ua) || window.innerWidth <= 768) {
		return 'Mobile';
	}

	return 'Desktop';
}

/**
 * Returns operating system.
 */
export function getOS() {
	const ua = navigator.userAgent;

	if (/Windows/i.test(ua)) return 'Windows';
	if (/Mac/i.test(ua)) return 'macOS';
	if (/Android/i.test(ua)) return 'Android';
	if (/iPhone|iPad/i.test(ua)) return 'iOS';
	if (/Linux/i.test(ua)) return 'Linux';

	return 'Unknown';
}

/**
 * Returns browser.
 */
export function getBrowser() {
	const ua = navigator.userAgent;

	if (/Edg/i.test(ua)) return 'Edge';
	if (/Chrome/i.test(ua)) return 'Chrome';
	if (/Firefox/i.test(ua)) return 'Firefox';
	if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';

	return 'Unknown';
}

/**
 * Returns all UTM parameters.
 */
export function getUTMs() {
	const params = new URLSearchParams(window.location.search);

	return {
		utm_source: params.get('utm_source') || '',

		utm_medium: params.get('utm_medium') || '',

		utm_campaign: params.get('utm_campaign') || 'organic',

		utm_content: params.get('utm_content') || '',

		utm_term: params.get('utm_term') || '',

		utm_id: params.get('utm_id') || '',
	};
}

/**
 * Removes null, undefined and empty values.
 */
export function sanitize(payload = {}) {
	return Object.fromEntries(
		Object.entries(payload).filter(([_, value]) => {
			if (value === null) return false;

			if (value === undefined) return false;

			if (value === '') return false;

			return true;
		}),
	);
}

/**
 * Safe console logger.
 */
export function log(...args) {
	console.log(
		'%cScape Analytics',
		'background:#081B33;color:#ffffff;padding:4px 8px;border-radius:4px;',
		...args,
	);
}

/**
 * Safe console warning.
 */
export function warn(...args) {
	console.warn(
		'%cScape Analytics',
		'background:#FFC107;color:#000;padding:4px 8px;border-radius:4px;',
		...args,
	);
}

/**
 * Safe console error.
 */
export function error(...args) {
	console.error(
		'%cScape Analytics',
		'background:#DC3545;color:#fff;padding:4px 8px;border-radius:4px;',
		...args,
	);
}
