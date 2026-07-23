/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: init.js
 * Version: 1.0.0
 *
 * Description:
 * SDK Bootstrap
 * Initializes the Analytics Engine and AutoTrack.
 * ============================================================================
 */

import { ScapeAnalytics } from './core/analytics.js';
import { ScapeAutoTrack } from './core/autotrack.js';
import { Events } from './events/events.js';

async function initializeSDK() {
	try {
		await ScapeAnalytics.init();

		ScapeAutoTrack.init();

		// Automatic Page View
		ScapeAnalytics.track(Events.PAGE_VIEW);

		console.log('✅ Scape Analytics SDK initialized successfully.');
	} catch (error) {
		console.error('❌ Failed to initialize Scape Analytics SDK', error);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeSDK);
} else {
	initializeSDK();
}
