/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: analytics.js
 * Version: 1.1.0
 *
 * Description:
 * Main Analytics Engine.
 * Central entry point for all analytics providers.
 * ============================================================================
 */

import { Mixpanel } from '../providers/mixpanel.js';
import { GA4 } from '../providers/ga4.js';
import { ScapeConfig } from '../config/config.js';
import { Events } from '../events/events.js';

class Analytics {
	constructor() {
		this.initialized = false;
		this.providers = [];
	}

	/**
	 * Initialize SDK
	 */
	async init() {
		if (this.initialized) return;

		if (ScapeConfig.providers.mixpanel.enabled) {
			await Mixpanel.init();
			this.providers.push(Mixpanel);
		}

		if (ScapeConfig.providers.ga4.enabled) {
			await GA4.init();
			this.providers.push(GA4);
		}

		this.initialized = true;

		console.log(`🚀 ${ScapeConfig.sdk.name} v${ScapeConfig.sdk.version}`);

		console.table(
			this.providers.map((provider) => ({
				Provider: provider.constructor.name,
				Status: 'Ready',
			})),
		);
	}

	/**
	 * Generic Track
	 */
	track(eventName, properties = {}) {
		if (!this.initialized) {
			console.warn('Analytics SDK not initialized.');
			return;
		}

		this.providers.forEach((provider) => {
			provider.track?.(eventName, properties);
		});
	}

	/**
	 * Page View
	 */
	page(properties = {}) {
		this.track(Events.PAGE_VIEW, properties);
	}

	/**
	 * Identify User
	 */
	identify(userId) {
		if (!this.initialized) return;

		this.providers.forEach((provider) => {
			provider.identify?.(userId);
		});
	}

	/**
	 * Register Super Properties
	 */
	register(properties = {}) {
		if (!this.initialized) return;

		this.providers.forEach((provider) => {
			provider.register?.(properties);
		});
	}

	/**
	 * People Properties
	 */
	people(properties = {}) {
		if (!this.initialized) return;

		this.providers.forEach((provider) => {
			provider.people?.(properties);
		});
	}

	/**
	 * Reset User
	 */
	reset() {
		if (!this.initialized) return;

		this.providers.forEach((provider) => {
			provider.reset?.();
		});
	}
}

export const ScapeAnalytics = new Analytics();
