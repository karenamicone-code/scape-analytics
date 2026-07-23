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
import mixpanel from 'mixpanel-browser';

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
	 * Track Event
	 */
	track(eventName, properties = {}) {
		console.log('➡️ Mixpanel.track()', eventName);

		if (!this.initialized) {
			console.warn('Mixpanel NOT initialized');
			return;
		}

		const payload = buildPayload(properties);

		console.log('Payload:', payload);

		mixpanel.track(eventName, payload);

		console.log('✅ Event sent to Mixpanel');

		if (ScapeConfig.debug) {
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
