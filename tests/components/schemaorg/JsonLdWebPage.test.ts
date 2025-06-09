import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { homePage } from '../../fixtures/sample.js';
import { JsonLdWebPage } from '../../../src/lib/index.js';

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

describe('JsonLdWebPage', () => {
	it('should have jsonld WebPage object with name and description only', async () => {
		render(JsonLdWebPage, {
			props: {
				data: homePage
			}
		});

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-webpage');
		const jsonLdString = JSON.parse(jsonLdScript);

		expect(jsonLdString['@type']).toBe('WebPage');
		expect(jsonLdString.name).toBe(homePage.title);
		expect(jsonLdString.description).toBe(homePage.description);
	});

	it('should fallback to empty description when not provided', () => {
		const dataWithoutDescription = {
			...homePage,
			description: undefined
		};

		render(JsonLdWebPage, { props: { data: dataWithoutDescription } });

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-webpage'));
		expect(json.description).toBe('');
	});

	it('should include author when provided', () => {
		const dataWithAuthor = {
			...homePage,
			author: {
				'@type': 'Person',
				name: 'Indaco'
			}
		};

		render(JsonLdWebPage, { props: { data: dataWithAuthor } });

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-webpage'));
		expect(json.author).toEqual(dataWithAuthor.author);
	});

	it('should include keywords when provided', () => {
		const dataWithKeywords = {
			...homePage,
			keywords: ['svelte', 'seo', 'jsonld']
		};

		render(JsonLdWebPage, { props: { data: dataWithKeywords } });

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-webpage'));
		expect(json.keywords).toEqual(dataWithKeywords.keywords);
	});
});
