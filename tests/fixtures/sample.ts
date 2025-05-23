import { OpenGraphType, TwitterCardType } from '$lib/types.js';
import type { SEOWebPage, SEOMenuItem, SEOWebSite } from '$lib/types.js';

export const website: SEOWebSite = {
	name: 'example.com',
	baseURL: 'https://example.com',
	language: 'en-GB',
	logo: 'logo.png',
	title: 'example',
	description: 'Example.com is your perfect fit.',
	favicon: 'favicon.ico',
	copyright: 'MIT License @ 2021-present example.com',
	keywords: ['sveltekit, components, tests, vitest'],
	contactEmail: '',
	socials: {
		github: 'https://github.com/examplecom'
	},
	creator: {
		name: 'username',
		email: 'github@example.com',
		url: 'https://yourwebgarder.com',
		jobTitle: 'webmaster',
		address: {
			city: 'City',
			state: 'CI',
			streetAddress: 'somewhere 101'
		}
	}
};

export const homePage: SEOWebPage = {
	url: website.baseURL,
	title: 'Home Page',
	description: 'This is the description for the Home Page',
	keywords: ['sveltekit, components, tests, vitest'],
	opengraph: {
		type: OpenGraphType.Website
	},
	twitter: {
		type: TwitterCardType.Summary
	}
};

export const sampleArticle: SEOWebPage = {
	url: website.baseURL + '/posts/getting-started',
	title: 'Getting Started Article',
	description: 'This is the description for the Getting Started Article',
	author: 'indaco',
	keywords: ['sveltekit, components, tests, vitest'],
	opengraph: {
		type: OpenGraphType.Article,
		article: {
			tags: ['sveltekit'],
			published_time: '23-01-2022',
			modified_time: '24-01-2022'
		}
	},
	twitter: {
		type: TwitterCardType.Large,
		site: '@indaco'
	}
};

export const menu: Array<SEOMenuItem> = [
	{
		identifier: 'home',
		name: 'Home',
		url: '/',
		weight: 1
	},
	{
		identifier: 'about',
		name: 'About',
		url: '/about',
		weight: 2
	},
	{
		identifier: 'github',
		name: 'GitHub',
		url: 'https://github.com/indaco',
		weight: 3,
		external: true
	}
];
