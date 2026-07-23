/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: init.js
 * Version: 1.1.0
 *
 * Description:
 * SDK Bootstrap
 * Initializes all SDK modules.
 * ============================================================================
 */

import { ScapeAnalytics } from './core/analytics.js';
import { ScapeAutoTrack } from './core/autotrack.js';
import { Navigation } from './core/navigation.js';

async function initializeSDK() {
	try {
		// Initialize Analytics Providers
		await ScapeAnalytics.init();

		// Initialize Auto Tracking
		ScapeAutoTrack.init();

		// Initialize Navigation Tracking
		Navigation.init();

		console.log('✅ Scape Analytics SDK initialized successfully.');
	} catch (error) {
		console.error('❌ Failed to initialize Scape Analytics SDK', error);
	}
}

// Bootstrap SDK
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeSDK);
} else {
	initializeSDK();
}

// Expose SDK globally (Debug / Console)
window.ScapeAnalytics = ScapeAnalytics;
