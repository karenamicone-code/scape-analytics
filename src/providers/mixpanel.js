/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: mixpanel.js
 * Version: 1.0.0
 *
 * Description:
 * Mixpanel Provider
 * ============================================================================
 */

import { ScapeConfig } from '../config/config.js';
import { buildPayload } from '../core/payload.js';

class MixpanelProvider {
	constructor() {
		this.initialized = false;
	}

	/**
	 * Load Mixpanel SDK
	 */
	async init() {
		if (this.initialized) return;

		if (!ScapeConfig.providers.mixpanel.enabled) {
			console.warn('Mixpanel disabled.');
			return;
		}

		await this.loadSDK();

		mixpanel.init(ScapeConfig.providers.mixpanel.token, {
			debug: ScapeConfig.debug,
			persistence: 'localStorage',
		});

		this.initialized = true;

		console.log('✅ Mixpanel initialized');
	}

	/**
	 * Load Mixpanel Script
	 */
	loadSDK() {
		return new Promise((resolve, reject) => {
			if (window.mixpanel) {
				resolve();
				return;
			}

			const script = document.createElement('script');

			script.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';

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

		mixpanel.track(eventName, payload);

		if (ScapeConfig.debug) {
			console.log('📤 Mixpanel Event');
			console.table(payload);
		}
	}

	/**
	 * Identify User
	 */
	identify(userId) {
		if (!this.initialized) return;

		mixpanel.identify(userId);
	}

	/**
	 * Set People Properties
	 */
	people(properties = {}) {
		if (!this.initialized) return;

		mixpanel.people.set(properties);
	}

	/**
	 * Reset User
	 */
	reset() {
		if (!this.initialized) return;

		mixpanel.reset();
	}
}

export const Mixpanel = new MixpanelProvider();
