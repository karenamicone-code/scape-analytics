/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: ga4.js
 * Version: 1.0.0
 *
 * Description:
 * Google Analytics 4 Provider
 * ============================================================================
 */

import { ScapeConfig } from '../config/config.js';
import { buildPayload } from '../core/payload.js';

class GA4Provider {
	constructor() {
		this.initialized = false;
	}

	/**
	 * Initialize Google Analytics
	 */
	async init() {
		if (this.initialized) return;

		if (!ScapeConfig.providers.ga4.enabled) {
			console.warn('GA4 disabled.');
			return;
		}

		await this.loadSDK();

		window.dataLayer = window.dataLayer || [];

		window.gtag = function () {
			dataLayer.push(arguments);
		};

		gtag('js', new Date());

		gtag('config', ScapeConfig.providers.ga4.measurementId, {
			anonymize_ip: true,
			send_page_view: false,
		});

		this.initialized = true;

		console.log('✅ GA4 initialized');
	}

	/**
	 * Load Google Analytics SDK
	 */
	loadSDK() {
		return new Promise((resolve, reject) => {
			if (window.gtag) {
				resolve();
				return;
			}

			const script = document.createElement('script');

			script.src = `https://www.googletagmanager.com/gtag/js?id=${ScapeConfig.providers.ga4.measurementId}`;

			script.async = true;

			script.onload = resolve;

			script.onerror = reject;

			document.head.appendChild(script);
		});
	}

	/**
	 * Track Event
	 */
	track(eventName, properties = {}) {
		if (!this.initialized) return;

		const payload = buildPayload(properties);

		gtag('event', eventName, payload);

		if (ScapeConfig.debug) {
			console.log('📤 GA4 Event');

			console.table(payload);
		}
	}

	/**
	 * Identify User
	 *
	 * GA4 does not support identify()
	 * We map it to user_id.
	 */
	identify(userId) {
		if (!this.initialized) return;

		gtag('set', {
			user_id: userId,
		});
	}

	/**
	 * Reset User
	 */
	reset() {
		// GA4 has no reset API.
	}
}

export const GA4 = new GA4Provider();
