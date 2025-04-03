import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

const baseProductData: SEOWebPage = {
	title: 'Sample Product Page',
	url: 'https://example.com/product',
	opengraph: {
		type: OpenGraphType.Product,
		product: {
			plural_title: 'Sample Products',
			price: 99.99,
			currency: 'USD'
		}
	}
};

describe('OpenGraph - Product', () => {
	it('renders all product meta tags', () => {
		render(OpenGraph, { props: { data: baseProductData } });

		expect(getMeta('product:plural_title')).toBe('Sample Products');
		expect(getMeta('product:price.amount')).toBe('99.99');
		expect(getMeta('product:price.currency')).toBe('USD');
	});

	it('renders only the fields provided', () => {
		const partialData: SEOWebPage = {
			...baseProductData,
			opengraph: {
				type: 'product',
				product: {
					plural_title: 'Limited Edition',
					currency: 'EUR'
				}
			}
		};

		render(OpenGraph, { props: { data: partialData } });

		expect(getMeta('product:plural_title')).toBe('Limited Edition');
		expect(getMeta('product:price.amount')).toBe('');
		expect(getMeta('product:price.currency')).toBe('EUR');
	});

	it('renders nothing if product is undefined', () => {
		const noProductData: SEOWebPage = {
			...baseProductData,
			opengraph: {
				type: 'product'
			}
		};

		render(OpenGraph, { props: { data: noProductData } });

		expect(getMeta('product:plural_title')).toBe('');
		expect(getMeta('product:price.amount')).toBe('');
		expect(getMeta('product:price.currency')).toBe('');
	});
});
