/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: autotrack.js
 * Version: 1.0.0
 *
 * Description:
 * Automatically tracks HTML elements using data-mp-* attributes.
 * ============================================================================
 */

import { ScapeAnalytics } from './analytics.js';

class AutoTrack {
	constructor() {
		this.initialized = false;
	}

	/**
	 * Initialize AutoTrack
	 */
	init() {
		if (this.initialized) return;

		document.addEventListener('click', this.handleClick.bind(this));

		this.initialized = true;

		console.log('✅ AutoTrack initialized');
	}

	/**
	 * Handle Click Events
	 */
	handleClick(event) {
		const element = event.target.closest('[data-mp-event]');

		if (!element) return;

		const eventName = element.dataset.mpEvent;

		if (!eventName) return;

		const properties = this.extractProperties(element);

		ScapeAnalytics.track(eventName, properties);
	}

	/**
	 * Extract every data-mp-* attribute.
	 *
	 * Example:
	 *
	 * data-mp-service="Massage"
	 * data-mp-section="Hero"
	 *
	 * becomes
	 *
	 * {
	 *    service:"Massage",
	 *    section:"Hero"
	 * }
	 *
	 */
	extractProperties(element) {
		const properties = {};

		Array.from(element.attributes).forEach((attribute) => {
			if (!attribute.name.startsWith('data-mp-')) {
				return;
			}

			if (attribute.name === 'data-mp-event') {
				return;
			}

			const property = attribute.name
				.replace('data-mp-', '')
				.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

			properties[property] = attribute.value;
		});

		return properties;
	}
}

export const ScapeAutoTrack = new AutoTrack();
