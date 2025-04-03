import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { website } from '../../fixtures/sample.js';
import { JsonLdWebSite } from '../../../src/lib/index.js';

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

describe('JsonLdWebSite', () => {
	it('should have jsonld WebSite object with props', async () => {
		render(JsonLdWebSite, {
			props: {
				data: website
			}
		});

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-website');
		const jsonLdString = JSON.parse(jsonLdScript);

		expect(jsonLdString['@type']).toBe('WebSite');
		expect(jsonLdString['@id']).toBe('https://example.com/#website');
		expect(jsonLdString.name).toBe('example.com');
		expect(jsonLdString.url).toBe('https://example.com');
		expect(jsonLdString.description).toBe('Example.com is your perfect fit.');
		expect(jsonLdString.inLanguage).toBe('en-GB');
	});

	it('should use fallback values when description, keywords, language, and copyright are missing', () => {
		const partialData = {
			...website,
			description: undefined,
			keywords: undefined,
			language: undefined,
			copyright: undefined
		};

		render(JsonLdWebSite, {
			props: { data: partialData }
		});

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-website'));

		expect(json.description).toBe('');
		expect(json.keywords).toEqual([]);
		expect(json.inLanguage).toBe('');
		expect(json.license).toBe('');
	});

	it('should include sameAs when socials are provided', async () => {
		const dataWithSocials = {
			...website,
			socials: {
				twitter: 'https://twitter.com/example',
				github: 'https://github.com/example'
			}
		};

		render(JsonLdWebSite, { props: { data: dataWithSocials } });

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-website');
		const json = JSON.parse(jsonLdScript);

		expect(json.sameAs).toContain('https://twitter.com/example');
		expect(json.sameAs).toContain('https://github.com/example');
	});

	it('should include sameAs when socials are defined and non-empty', () => {
		const dataWithSameAs = {
			...website,
			socials: {
				twitter: 'https://twitter.com/example',
				github: 'https://github.com/example'
			}
		};

		render(JsonLdWebSite, {
			props: { data: dataWithSameAs }
		});

		const jsonLdScript = getScripts('application/ld+json', 'jsonld-website');
		const json = JSON.parse(jsonLdScript);

		expect(json.sameAs).toEqual(['https://twitter.com/example', 'https://github.com/example']);
	});

	it('should skip sameAs when socials are empty', () => {
		const data = {
			...website,
			socials: {
				twitter: ''
			}
		};

		render(JsonLdWebSite, { props: { data } });
		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-website'));
		expect(json.sameAs).toBeUndefined();
	});

	it('should handle string address for creator', () => {
		const dataWithStringAddress = {
			...website,
			creator: {
				...website.creator,
				address: '123 Anywhere St, London'
			}
		};

		render(JsonLdWebSite, {
			props: { data: dataWithStringAddress }
		});

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-website'));

		expect(json.creator.address).toBe('123 Anywhere St, London');
		expect(json.creator['@type']).toBe('Person'); // assuming website.creator is a person
	});

	it('should render creator as Organization when jobTitle is not provided', () => {
		const dataWithoutJobTitle = {
			...website,
			creator: {
				name: 'Indaco Team',
				email: 'team@example.com',
				url: 'https://example.com/team',
				telephone: '+1234567890',
				address: '123 Organization St'
				// No jobTitle
			}
		};

		render(JsonLdWebSite, { props: { data: dataWithoutJobTitle } });

		const json = JSON.parse(getScripts('application/ld+json', 'jsonld-website'));

		expect(json.creator['@type']).toBe('Organization');
		expect(json.creator.name).toBe('Indaco Team');
		expect(json.creator.address).toBe('123 Organization St');
	});
});
