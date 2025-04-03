import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../../src/routes/+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', () => {
		render(Page);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('@indaco/sveo');
	});

	test('sets <title> from homePage', () => {
		render(Page);
		expect(document.title).toBe('Home Page');
	});

	test('sets meta description from homePage', () => {
		render(Page);
		const meta = document.head.querySelector('meta[name="description"]');
		expect(meta).toHaveAttribute('content', 'This is the description for the Home Page');
	});

	test('sets og:type to Website', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:type"]');
		expect(meta).toHaveAttribute('content', 'website');
	});

	test('sets og:title', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:title"]');
		expect(meta).toHaveAttribute('content', 'Home Page');
	});

	test('sets og:description', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="og:description"]');
		expect(meta).toHaveAttribute('content', 'This is the description for the Home Page');
	});

	test('sets twitter:card to summary', () => {
		render(Page);
		const meta = document.head.querySelector('meta[property="twitter:card"]');
		expect(meta).toHaveAttribute('content', 'summary');
	});

	test('renders JSON-LD WebSite', () => {
		render(Page);
		const script = document.head.querySelector(
			'script[type="application/ld+json"][data-testid="jsonld-website"]'
		);
		expect(script?.textContent).toContain('"@type": "WebSite"');
		expect(script?.textContent).toContain('"name": "example.com"');
		expect(script?.textContent).toContain('"inLanguage": "en-GB"');
	});

	test('renders JSON-LD WebPage', () => {
		render(Page);
		const script = document.head.querySelector(
			'script[type="application/ld+json"][data-testid="jsonld-webpage"]'
		);
		expect(script?.textContent).toContain('"@type": "WebPage"');
		expect(script?.textContent).toContain('"name": "Home Page"');
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

	test('renders correct <head> snapshot', () => {
		render(Page);
		expect(document.head.innerHTML).toMatchSnapshot();
	});
});
