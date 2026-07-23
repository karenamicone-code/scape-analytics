/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: config.js
 * Version: 1.0.0
 * Description:
 * Centralized SDK configuration.
 * ============================================================================
 */

const hostname = window.location.hostname;

const isProduction =
	hostname === 'scapewellness.com' || hostname === 'www.scapewellness.com';

export const ScapeConfig = Object.freeze({
	sdk: {
		name: 'Scape Analytics SDK',
		version: '1.0.0',
	},

	environment: {
		name: isProduction ? 'production' : 'staging',
		isProduction,
		hostname,
	},

	providers: {
		mixpanel: {
			enabled: isProduction,

			token: isProduction ? 'fdff61c47451a84fa8f2793f7988dff2' : null,
		},

		ga4: {
			enabled: isProduction,

			measurementId: isProduction ? 'G-C1Y7H9TM3K' : null,
		},
	},

	api: {
		baseUrl: isProduction
			? 'https://client.api.scapewellness.com'
			: 'https://staging.api.scapewellness.com',

		parse: {
			applicationId: isProduction ? 'scape' : 'scape-staging',

			restApiKey: isProduction
				? 'a196b333-2e73-4700-8ac8-66fdc88751d8'
				: 'scapeStagingRestKey',
		},
	},

	debug: !isProduction,
});
