import { svelteTesting } from '@testing-library/svelte/vite';
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
			reporter: ['text', 'lcov']
		},
		reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['tests/**/*.svelte.test.ts', 'tests/**/*.test.ts']
				}
			}
		]
	}
});
