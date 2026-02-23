import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta, getMetaAll } from '../../../testutils.js';

const baseData: SEOWebPage = {
	url: 'https://example.com/episode/interstellar-pilot',
	title: 'Interstellar Pilot',
	opengraph: {
		type: OpenGraphType.VideoEpisode,
		episode: {
			actor: [
				{ url: 'https://example.com/actor/mcconaughey' },
				{ url: 'https://example.com/actor/hathaway' }
			],
			actorRole: 'Captain Cooper',
			director: [{ url: 'https://example.com/director/nolan' }],
			writer: [{ url: 'https://example.com/writer/nolan' }],
			duration: 4320,
			release_date: '2023-11-01T00:00:00Z',
			tags: ['sci-fi', 'space'],
			series: {
				url: 'https://example.com/series/interstellar',
				actor: [],
				director: [],
				writer: [],
				duration: 0,
				release_date: '2023-01-01T00:00:00Z',
				tags: []
			}
		}
	}
};

describe('OpenGraph - VideoEpisode', () => {
	it('renders all episode metadata correctly', () => {
		render(OpenGraph, { props: { data: baseData } });

		expect(getMetaAll('video:actor')).toEqual([
			'https://example.com/actor/mcconaughey',
			'https://example.com/actor/hathaway'
		]);

		expect(getMeta('video:actor:role')).toBe('Captain Cooper');
		expect(getMeta('video:director')).toBe('https://example.com/director/nolan');
		expect(getMeta('video:writer')).toBe('https://example.com/writer/nolan');
		expect(getMeta('video:duration')).toBe('4320');
		expect(getMeta('video:release_date')).toBe('2023-11-01T00:00:00.000Z');

		expect(getMetaAll('video:tag')).toEqual(['sci-fi', 'space']);

		expect(getMeta('video:series')).toBe('https://example.com/series/interstellar');
	});
});
