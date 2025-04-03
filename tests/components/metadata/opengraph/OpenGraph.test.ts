import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import type { SEOWebPage } from '../../../../src/lib/types';
import { OpenGraphType } from '../../../../src/lib/types';

function getMeta(property: string): string {
	const metas = document.getElementsByTagName('meta');
	for (let i = 0; i < metas.length; i++) {
		if (metas[i].getAttribute('property') === property) {
			return metas[i].getAttribute('content') || '';
		}
	}
	return '';
}

describe('OpenGraph - Base Meta Tags', () => {
	it('renders base Open Graph meta tags', () => {
		const data: SEOWebPage = {
			url: 'https://example.com/post',
			title: 'Open Graph Title',
			description: 'This is a description',
			image: {
				url: 'https://example.com/image.jpg',
				alt: 'Image Alt'
			},
			opengraph: {
				type: OpenGraphType.Article
			}
		};

		render(OpenGraph, { props: { data } });

		expect(getMeta('og:type')).toBe(OpenGraphType.Article);
		expect(getMeta('og:url')).toBe(data.url);
		expect(getMeta('og:title')).toBe(data.title);
		expect(getMeta('og:description')).toBe(data.description);
		expect(getMeta('og:image')).toBe(data.image?.url);
		expect(getMeta('og:image:alt')).toBe(data.image?.alt);
	});

	it('does not render optional tags when data is missing', () => {
		const data: SEOWebPage = {
			url: 'https://example.com/post',
			title: 'Fallback Title',
			opengraph: {
				type: OpenGraphType.Article
			}
		};

		render(OpenGraph, { props: { data } });

		expect(getMeta('og:type')).toBe(OpenGraphType.Article);
		expect(getMeta('og:url')).toBe(data.url);
		expect(getMeta('og:title')).toBe(data.title);
		expect(getMeta('og:description')).toBe('');
		expect(getMeta('og:image')).toBe('');
		expect(getMeta('og:image:alt')).toBe('');
	});
});
