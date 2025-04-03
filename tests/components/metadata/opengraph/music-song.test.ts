import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

const baseSongData: SEOWebPage = {
	title: 'Awesome Song',
	url: 'https://example.com/song',
	opengraph: {
		type: OpenGraphType.MusicSong,
		song: {
			url: 'https://cdn.example.com/audio.mp3',
			duration: 240,
			disc: 1,
			track: 5,
			album: [{ url: 'https://example.com/album-1' }, { url: 'https://example.com/album-2' }],
			musician: [
				{ url: 'https://example.com/artist-1', first_name: 'Jane' },
				{ url: 'https://example.com/artist-2', first_name: 'John' }
			]
		}
	}
};

describe('OpenGraph - MusicSong', () => {
	it('renders all song metadata correctly', () => {
		render(OpenGraph, { props: { data: baseSongData } });

		expect(getMeta('og:audio')).toBe('https://cdn.example.com/audio.mp3');
		expect(getMeta('music:duration')).toBe('240');
		expect(getMeta('music:album')).toBe('https://example.com/album-1'); // first one
		expect(getMeta('music:album:disc')).toBe('1');
		expect(getMeta('music:album:track')).toBe('5');
		expect(getMeta('music:musician')).toBe('https://example.com/artist-1'); // first one
	});

	it('renders only provided fields', () => {
		const partial: SEOWebPage = {
			...baseSongData,
			opengraph: {
				type: 'music.song',
				song: {
					url: 'https://cdn.example.com/audio.mp3',
					track: 2
				}
			}
		};

		render(OpenGraph, { props: { data: partial } });

		expect(getMeta('og:audio')).toBe('https://cdn.example.com/audio.mp3');
		expect(getMeta('music:duration')).toBe('');
		expect(getMeta('music:album')).toBe('');
		expect(getMeta('music:album:disc')).toBe('');
		expect(getMeta('music:album:track')).toBe('2');
		expect(getMeta('music:musician')).toBe('');
	});

	it('renders nothing if song is missing', () => {
		const noSong: SEOWebPage = {
			...baseSongData,
			opengraph: {
				type: 'music.song'
			}
		};

		render(OpenGraph, { props: { data: noSong } });

		expect(getMeta('og:audio')).toBe('');
		expect(getMeta('music:duration')).toBe('');
		expect(getMeta('music:album')).toBe('');
		expect(getMeta('music:album:disc')).toBe('');
		expect(getMeta('music:album:track')).toBe('');
		expect(getMeta('music:musician')).toBe('');
	});
});
