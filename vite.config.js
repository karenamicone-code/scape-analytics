import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		outDir: 'dist',

		emptyOutDir: true,

		lib: {
			entry: 'src/init.js',

			name: 'ScapeAnalytics',

			formats: ['iife'],

			fileName: () => 'scape-analytics.js',
		},

		rollupOptions: {
			output: {
				banner: `/*!
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * Version: 1.0.0
 * © Scape Wellness
 * https://github.com/karenamicone-code/scape-analytics
 * ============================================================================
 */`,
			},
		},

		minify: false,

		sourcemap: true,
	},
});
