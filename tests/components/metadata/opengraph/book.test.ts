import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

// Base dummy object
const baseBookData: SEOWebPage = {
	title: 'Book Title',
	url: 'https://example.com/book_1',
	description: 'A fascinating book',
	opengraph: {
		type: OpenGraphType.Book,
		book: {
			author: 'John Doe',
			isbn: '1234567890',
			release_date: '2024-01-01',
			tags: ['fiction', 'bestseller']
		}
	}
};

function clone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

describe('OpenGraph - Book', () => {
	it('renders all available book metadata', () => {
		const data: SEOWebPage = structuredClone(baseBookData);

		render(OpenGraph, { props: { data } });

		expect(getMeta('book:author')).toBe('John Doe');
		expect(getMeta('book:isbn')).toBe('1234567890');
		expect(getMeta('book:release_date')).toBe('2024-01-01T00:00:00.000Z');
		expect(getMeta('book:tag')).toBe('fiction'); // only first tag checked
	});

	it('renders only the first tag if multiple are provided', () => {
		const data: SEOWebPage = clone(baseBookData);

		if (!data.opengraph) throw new Error('opengraph is missing');
		if (!data.opengraph.book) throw new Error('book is missing');

		data.opengraph.book.tags = ['tag-one', 'tag-two', 'tag-three'];

		render(OpenGraph, { props: { data } });

		expect(getMeta('book:tag')).toBe('tag-one');
	});

	it('renders nothing if book data is undefined', () => {
		const data: SEOWebPage = clone(baseBookData);

		if (!data.opengraph) throw new Error('opengraph is missing');
		delete data.opengraph.book;

		render(OpenGraph, { props: { data } });

		expect(getMeta('book:author')).toBe('');
		expect(getMeta('book:isbn')).toBe('');
		expect(getMeta('book:release_date')).toBe('');
		expect(getMeta('book:tag')).toBe('');
	});
});
