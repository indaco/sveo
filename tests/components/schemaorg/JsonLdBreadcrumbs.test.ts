import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { website } from '../../fixtures/sample.js';
import { JsonLdBreadcrumbs } from '../../../src/lib/index.js';

function getScripts(scriptType: string, dataTestId: string): string {
	const scripts = document.getElementsByTagName('script');
	for (let i = 0; i < scripts.length; i += 1) {
		if (
			scripts[i].getAttribute('type') === scriptType &&
			scripts[i].getAttribute('data-testid') === dataTestId
		) {
			return scripts[i].text;
		}
	}
	return '';
}

describe('JsonLdBreadcrumbs', () => {
	it('should have jsonld BreadcrumbList object with props', async () => {
		render(JsonLdBreadcrumbs, {
			props: {
				url: `${website.baseURL}/home`
			}
		});

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-breadcrumbs');
		const jsonLdString = JSON.parse(jsonLdScript);

		expect(jsonLdString['@type']).toBe('BreadcrumbList');
		expect(jsonLdString.itemListElement.length).toBe(2);
	});

	it('should have home element', async () => {
		render(JsonLdBreadcrumbs, {
			props: {
				url: `${website.baseURL}/home`
			}
		});

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-breadcrumbs');
		const jsonLdString = JSON.parse(jsonLdScript);

		const homeElement = jsonLdString.itemListElement[0];
		expect(homeElement['@type']).toBe('ListItem');
		expect(homeElement.position).toBe(1);
		expect(homeElement.name).toBe('Home');
		expect(homeElement.url).toBe('https://example.com');
	});

	it('should have about element', async () => {
		render(JsonLdBreadcrumbs, {
			props: {
				url: `${website.baseURL}/about`
			}
		});
		const jsonLdScript = getScripts('application/ld+json', 'jsonld-breadcrumbs');
		const jsonLdString = JSON.parse(jsonLdScript);

		const aboutElement = jsonLdString.itemListElement[1];
		expect(aboutElement['@type']).toBe('ListItem');
		expect(aboutElement['position']).toBe(2);
	});

	it('should correctly create breadcrumbs for multi-level URLs', async () => {
		const url = `${website.baseURL}/docs/getting-started`;

		render(JsonLdBreadcrumbs, { props: { url } });

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-breadcrumbs');
		const jsonLd = JSON.parse(jsonLdScript);

		expect(jsonLd['@type']).toBe('BreadcrumbList');
		expect(jsonLd.itemListElement).toHaveLength(3);

		const [home, docs, gettingStarted] = jsonLd.itemListElement;
		expect(home.name).toBe('Home');
		expect(home.url).toBe('https://example.com');

		expect(docs.name).toBe('docs');
		expect(docs.url).toBe('https://example.com/docs');

		expect(gettingStarted.name).toBe('getting-started');
		expect(gettingStarted.url).toBe('https://example.com/docs/getting-started');
	});

	it('should handle URLs with trailing slashes correctly', async () => {
		const url = 'https://example.com/docs/getting-started/';
		render(JsonLdBreadcrumbs, { props: { url } });

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-breadcrumbs');
		const jsonLd = JSON.parse(jsonLdScript);

		const lastItem = jsonLd.itemListElement.at(-1);
		expect(lastItem.name).toBe('getting-started');
		expect(lastItem.url).toBe(url.replace(/\/+$/, '')); // or use normalized URL
	});
});
