/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: navigation.js
 * Version: 1.1.0
 *
 * Description:
 * Navigation Manager
 * Detects page navigation and automatically sends Page View events.
 * ============================================================================
 */

import { ScapeAnalytics } from './analytics.js';

class NavigationManager {
	constructor() {
		this.initialized = false;
		this.currentUrl = window.location.href;
	}

	init() {
		if (this.initialized) return;

		this.initialized = true;

		// Primera carga
		this.trackPage();

		// Restauración desde BFCache
		window.addEventListener('pageshow', (event) => {
			if (event.persisted) {
				this.trackPage();
			}
		});

		// Botón atrás / adelante
		window.addEventListener('popstate', () => {
			this.handleNavigation();
		});

		// Interceptar pushState
		const originalPushState = history.pushState;

		history.pushState = (...args) => {
			originalPushState.apply(history, args);

			this.handleNavigation();
		};

		// Interceptar replaceState
		const originalReplaceState = history.replaceState;

		history.replaceState = (...args) => {
			originalReplaceState.apply(history, args);

			this.handleNavigation();
		};

		console.log('✅ Navigation initialized');
	}

	handleNavigation() {
		const newUrl = window.location.href;

		if (newUrl === this.currentUrl) {
			return;
		}

		this.currentUrl = newUrl;

		this.trackPage();
	}

	trackPage() {
		console.log('👁 Viewed Page:', window.location.pathname);

		ScapeAnalytics.page();
	}
}

export const Navigation = new NavigationManager();
