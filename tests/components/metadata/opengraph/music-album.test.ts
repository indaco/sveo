import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

const baseMusicAlbumData: SEOWebPage = {
	title: 'Chill Vibes',
	url: 'https://example.com/music/chill-vibes',
	opengraph: {
		type: OpenGraphType.MusicAlbum,
		album: {
			url: 'https://cdn.example.com/audio/album.mp3',
			release_date: '2023-12-01',
			disc: 1,
			track: 8,
			musicians: [
				{ url: 'https://example.com/musician/jane' },
				{ url: 'https://example.com/musician/john' }
			],
			songs: [
				{ url: 'https://example.com/song/track-1' },
				{ url: 'https://example.com/song/track-2' }
			]
		}
	}
};

describe('OpenGraph - MusicAlbum', () => {
	it('renders all album metadata correctly', () => {
		render(OpenGraph, { props: { data: baseMusicAlbumData } });

		expect(getMeta('og:audio')).toBe('https://cdn.example.com/audio/album.mp3');
		expect(getMeta('music:release_date')).toBe('2023-12-01T00:00:00.000Z');
		expect(getMeta('music:musician')).toBe('https://example.com/musician/jane'); // first one
		expect(getMeta('music:song')).toBe('https://example.com/song/track-1'); // first one
		expect(getMeta('music:album:disc')).toBe('1');
		expect(getMeta('music:album:track')).toBe('8');
	});

	it('renders only provided fields', () => {
		const partial: SEOWebPage = {
			...baseMusicAlbumData,
			opengraph: {
				type: 'music.album',
				album: {
					url: 'https://cdn.example.com/audio/album.mp3'
				}
			}
		};

		render(OpenGraph, { props: { data: partial } });

		expect(getMeta('og:audio')).toBe('https://cdn.example.com/audio/album.mp3');
		expect(getMeta('music:release_date')).toBe('');
		expect(getMeta('music:musician')).toBe('');
		expect(getMeta('music:song')).toBe('');
		expect(getMeta('music:album:disc')).toBe('');
		expect(getMeta('music:album:track')).toBe('');
	});

	it('renders nothing if album is missing', () => {
		const noAlbum: SEOWebPage = {
			...baseMusicAlbumData,
			opengraph: {
				type: 'music.album'
			}
		};

		render(OpenGraph, { props: { data: noAlbum } });

		expect(getMeta('og:audio')).toBe('');
		expect(getMeta('music:release_date')).toBe('');
		expect(getMeta('music:musician')).toBe('');
		expect(getMeta('music:song')).toBe('');
		expect(getMeta('music:album:disc')).toBe('');
		expect(getMeta('music:album:track')).toBe('');
	});
});
