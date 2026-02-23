import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from '../../src/routes/+page.svelte';
import { page } from 'vitest/browser';

describe('/+page.svelte', () => {
	test('should render h1', () => {
		render(Page);
		expect(page.getByRole('heading', { level: 1 })).toHaveTextContent('@indaco/sveo');
	});

	test('sets <title> from homePage', () => {
		render(Page);
		expect(document.title).toBe('Getting Started Article');
	});

	test('sets meta description from homePage', () => {
		render(Page);
		const meta = document.head.querySelector('meta[name="description"]');
		expect(meta).toHaveAttribute(
			'content',
			'This is the description for the Getting Started Article'
		);
	});

	test('sets og:type to article', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:type"]');
		expect(meta).toHaveAttribute('content', 'article');
	});

	test('sets og:title', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:title"]');
		expect(meta).toHaveAttribute('content', 'Getting Started Article');
	});

	test('sets og:description', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:description"]');
		expect(meta).toHaveAttribute(
			'content',
			'This is the description for the Getting Started Article'
		);
	});

	test('sets twitter:card to summary', () => {
		render(Page);
		const meta = document.head.querySelector('meta[name="twitter:card"]');
		expect(meta).toHaveAttribute('content', 'summary');
	});

	test('renders JSON-LD WebSite', () => {
		render(Page);
		const script = document.head.querySelector(
			'script[type="application/ld+json"][data-testid="jsonld-website"]'
		);
		expect(script?.textContent).toContain('"@type": "WebSite"');
		expect(script?.textContent).toContain('"name": "My Svelte App"');
		expect(script?.textContent).toContain('"inLanguage": "en"');
	});

	test('renders JSON-LD SiteNavigationElements', () => {
		render(Page);
		const script = document.head.querySelector(
			'script[type="application/ld+json"][data-testid="jsonld-sitenavigationelements"]'
		);
		expect(script?.textContent).toContain('"@type": "SiteNavigationElement"');
		expect(script?.textContent).toContain('"name": "Home"');
		expect(script?.textContent).toContain('"url": "https://example.com/about"');
	});
});
