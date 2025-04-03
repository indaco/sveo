import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { sampleArticle } from '../../../fixtures/sample.js';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { getMeta } from '../../../testutils.js';

describe('OpenGraph - Article', () => {
	it('should have meta props to HTML markup', async () => {
		render(OpenGraph, {
			props: {
				data: sampleArticle
			}
		});

		expect(getMeta('og:type')).toBe('article');
		expect(getMeta('og:url')).toBe('https://example.com/posts/getting-started');
		expect(getMeta('og:title')).toBe(sampleArticle.title);
		expect(getMeta('og:description')).toBe(sampleArticle.description);
		expect(getMeta('article:author')).toBe(sampleArticle.author);
		expect(getMeta('article:tag')).toBe('sveltekit');
	});

	it('should render only expiration_time meta when others are missing', () => {
		const article = structuredClone(sampleArticle);
		article.opengraph.article = {
			expiration_time: '2025-12-31'
		};

		render(OpenGraph, { props: { data: article } });

		expect(getMeta('article:expiration_time')).toBe('2025-12-31T00:00:00.000Z');
		expect(getMeta('article:published_time')).toBe('');
		expect(getMeta('article:modified_time')).toBe('');
	});

	it('should render only expiration_time meta when others are missing', async () => {
		const article = {
			title: 'Minimal Article',
			description: 'Just expiration',
			opengraph: {
				type: 'article',
				article: {
					expiration_time: new Date('2025-12-31')
				}
			}
		};

		render(OpenGraph, { props: { data: article } });

		expect(getMeta('article:expiration_time')).toBe('2025-12-31T00:00:00.000Z');
		expect(getMeta('article:published_time')).toBe('');
		expect(getMeta('article:modified_time')).toBe('');
	});

	it('should render only published_time meta when passed as string', async () => {
		const article = {
			title: 'String Date Article',
			description: 'Only published_time as string',
			opengraph: {
				type: 'article',
				article: {
					published_time: '2023-08-15'
				}
			}
		};

		render(OpenGraph, { props: { data: article } });

		expect(getMeta('article:expiration_time')).toBe('');
		expect(getMeta('article:published_time')).toBe('2023-08-15T00:00:00.000Z');
		expect(getMeta('article:modified_time')).toBe('');
	});

	it('should render only modified_time meta when others are missing', async () => {
		const article = {
			title: 'Only Modified',
			description: 'Modified time only',
			opengraph: {
				type: 'article',
				article: {
					modified_time: '2024-10-10T12:30:00.000Z'
				}
			}
		};

		render(OpenGraph, { props: { data: article } });

		expect(getMeta('article:published_time')).toBe('');
		expect(getMeta('article:expiration_time')).toBe('');
		expect(getMeta('article:modified_time')).toBe('2024-10-10T12:30:00.000Z');
	});

	it('should render article:section meta when section is provided', async () => {
		const article = {
			...sampleArticle,
			opengraph: {
				...sampleArticle.opengraph,
				article: {
					...sampleArticle.opengraph.article,
					section: 'News'
				}
			}
		};

		render(OpenGraph, { props: { data: article } });

		expect(getMeta('article:section')).toBe('News');
	});
});
