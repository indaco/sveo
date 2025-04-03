import { describe, it, expect } from 'vitest';
import type { WithContext, WebSite } from 'schema-dts';

import {
	serializeJSONLdSchema,
	isSEOPerson,
	toISODateString,
	pathSegments
} from '../../src/lib/utils';

describe('serializeJSONLdSchema', () => {
	it('should return a script tag with JSON-LD content and test id', () => {
		const schema: WithContext<WebSite> = {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'My Website'
		};

		const result = serializeJSONLdSchema(schema, 'test-id');
		expect(result).toContain('<script type="application/ld+json" data-testid="test-id">');
		expect(result).toContain('"@type": "WebSite"');
		expect(result).toContain('"name": "My Website"');
	});
});

describe('isSEOPerson', () => {
	it('should return true if jobTitle exists and is not empty', () => {
		const person = {
			name: 'John Doe',
			jobTitle: 'Developer',
			email: 'john@example.com'
		};
		expect(isSEOPerson(person)).toBe(true);
	});

	it('should return false if jobTitle is missing', () => {
		const contact = {
			name: 'John Doe',
			email: 'john@example.com'
		};
		expect(isSEOPerson(contact)).toBe(false);
	});

	it('should return false if jobTitle is an empty string', () => {
		const person = {
			name: 'Jane Doe',
			jobTitle: '',
			email: 'jane@example.com'
		};
		expect(isSEOPerson(person)).toBe(false);
	});
});

describe('toISODateString', () => {
	it('should return undefined if date is undefined or null', () => {
		expect(toISODateString(undefined)).toBeUndefined();
		expect(toISODateString(null)).toBeUndefined();
	});

	it('should convert a valid date string to an ISO string', () => {
		const input = '2023-01-01';
		expect(toISODateString(input)).toBe('2023-01-01T00:00:00.000Z');
	});

	it('should convert a Date object to an ISO string', () => {
		const date = new Date('2023-01-01T00:00:00Z');
		expect(toISODateString(date)).toBe('2023-01-01T00:00:00.000Z');
	});

	it('should return undefined for an invalid date string', () => {
		expect(toISODateString('not-a-date')).toBeUndefined();
	});
});

describe('pathSegments', () => {
	it('should split a valid URL into path segments', () => {
		const result = pathSegments('https://example.com/blog/post/123');
		expect(result).toEqual(['blog', 'post', '123']);
	});

	it('should return an empty array for a root URL', () => {
		const result = pathSegments('https://example.com/');
		expect(result).toEqual([]);
	});

	it('should throw an error for invalid URL', () => {
		expect(() => pathSegments('not-a-valid-url')).toThrow('[pathSegments] Expected a valid URL');
	});
});
