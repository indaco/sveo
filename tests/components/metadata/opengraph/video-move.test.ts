import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta, getMetaAll } from '../../../testutils.js';

describe('OpenGraph - VideoMovie', () => {
	const baseData: SEOWebPage = {
		url: 'https://example.com/movies/interstellar',
		title: 'Interstellar',
		opengraph: {
			type: OpenGraphType.VideoMovie,
			movie: {
				actor: [{ url: 'https://example.com/actor/mcconaughey' }],
				actorRole: 'Cooper',
				director: [{ url: 'https://example.com/director/nolan' }],
				writer: [{ url: 'https://example.com/writer/nolan' }],
				duration: 10120,
				release_date: '2014-11-07',
				tags: ['space', 'science', 'love']
			}
		}
	};

	it('renders all video movie metadata correctly', () => {
		render(OpenGraph, { props: { data: baseData } });

		expect(getMeta('video:actor')).toBe('https://example.com/actor/mcconaughey');
		expect(getMeta('video:actor:role')).toBe('Cooper');
		expect(getMeta('video:director')).toBe('https://example.com/director/nolan');
		expect(getMeta('video:writer')).toBe('https://example.com/writer/nolan');
		expect(getMeta('video:duration')).toBe('10120');
		expect(getMeta('video:release_date')).toBe('2014-11-07T00:00:00.000Z');
		expect(getMeta('video:tag')).toBe('space');
	});

	it('renders nothing if `movie` is missing', () => {
		const data = structuredClone(baseData);
		// @ts-expect-error - for testing missing movie
		delete data.opengraph.movie;

		render(OpenGraph, { props: { data } });

		expect(getMeta('video:actor')).toBe('');
		expect(getMeta('video:actor:role')).toBe('');
		expect(getMeta('video:director')).toBe('');
		expect(getMeta('video:writer')).toBe('');
		expect(getMeta('video:duration')).toBe('');
		expect(getMeta('video:release_date')).toBe('');
		expect(getMeta('video:tag')).toBe('');
	});

	it('renders multiple actors and tags if provided', () => {
		const data = structuredClone(baseData);
		data.opengraph!.movie!.actor = [
			{ url: 'https://example.com/actor/mcconaughey' },
			{ url: 'https://example.com/actor/hathaway' }
		];
		data.opengraph!.movie!.tags = ['space', 'time'];

		render(OpenGraph, { props: { data } });

		const actors = getMetaAll('video:actor');
		const tags = getMetaAll('video:tag');

		expect(actors).toEqual([
			'https://example.com/actor/mcconaughey',
			'https://example.com/actor/hathaway'
		]);

		expect(tags).toEqual(['space', 'time']);
	});
});
