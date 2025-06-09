import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	clearScreen: false,
	plugins: [sveltekit()],
	test: {
		globals: true,
		coverage: {
			enabled: true,
			provider: 'v8',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.{ts,svelte}']
		},
		reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['tests/**/*.svelte.test.ts', 'tests/**/*.test.ts'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			}
		]
	}
});
