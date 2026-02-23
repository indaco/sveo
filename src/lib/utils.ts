import type { Thing, WithContext } from 'schema-dts';
import type { SEOContact, SEOPerson } from './types.js';

export type Schema = Thing | WithContext<Thing>;

export function serializeJSONLdSchema(thing: Schema, dataTestId: string) {
	const safeId = dataTestId.replace(/"/g, '');
	const json = JSON.stringify(thing, null, 2).replace(/</g, '\\u003c');
	return `<script type="application/ld+json" data-testid="${safeId}">${json}</script>`;
}

export const isSEOPerson = (contact: SEOContact): contact is SEOPerson =>
	contact.jobTitle != undefined && contact.jobTitle != '';

export function toISODateString(date: string | Date | undefined | null): string | undefined {
	if (!date) return undefined;
	const d = typeof date === 'string' ? new Date(date) : date;
	return d instanceof Date && !isNaN(d.getTime()) ? d.toISOString() : undefined;
}

export function pathSegments(url: string): string[] {
	try {
		const pathname = new URL(url).pathname;
		return pathname.split('/').filter((part) => part.trim() !== '');
	} catch (error) {
		throw new Error(`[pathSegments] Expected a valid URL: ${error}`, { cause: error });
	}
}
