import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

const baseBusinessData: SEOWebPage = {
	title: 'Test Business Page',
	url: 'https://example.com/business',
	opengraph: {
		type: OpenGraphType.Business,
		business: {
			street_address: '123 Main St',
			city: 'Metropolis',
			state: 'NY',
			postal_code: '12345',
			country: 'USA'
		}
	}
};

describe('OpenGraph - Business', () => {
	it('renders all business contact metadata', () => {
		render(OpenGraph, { props: { data: baseBusinessData } });

		expect(getMeta('business:contact_data:street_address')).toBe('123 Main St');
		expect(getMeta('business:contact_data:locality')).toBe('Metropolis');
		expect(getMeta('business:contact_data:region')).toBe('NY');
		expect(getMeta('business:contact_data:postal_code')).toBe('12345');
		expect(getMeta('business:contact_data:country_name')).toBe('USA');
	});

	it('renders only the fields provided', () => {
		const partialData: SEOWebPage = {
			...baseBusinessData,
			opengraph: {
				type: OpenGraphType.Business,
				...baseBusinessData.opengraph,
				business: {
					street_address: '456 Another St',
					country: 'Canada'
				}
			}
		};

		render(OpenGraph, { props: { data: partialData } });

		expect(getMeta('business:contact_data:street_address')).toBe('456 Another St');
		expect(getMeta('business:contact_data:country_name')).toBe('Canada');
		expect(getMeta('business:contact_data:locality')).toBe('');
		expect(getMeta('business:contact_data:region')).toBe('');
		expect(getMeta('business:contact_data:postal_code')).toBe('');
	});
});
