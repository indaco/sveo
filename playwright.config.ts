import { defineConfig } from '@playwright/test';

export default defineConfig({
	workers: process.env.CI ? 1 : undefined
});
