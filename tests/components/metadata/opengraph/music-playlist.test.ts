import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

const baseMusicPlaylistData: SEOWebPage = {
	title: 'Indie Favorites',
	url: 'https://example.com/music/playlist',
	opengraph: {
		type: OpenGraphType.MusicPlaylist,
		playlist: {
			url: 'https://cdn.example.com/audio/album.mp3',
			song: {
				url: 'https://example.com/song/indie-hit',
				disc: 2,
				track: 7
			},
			creator: {
				url: 'https://example.com/creator/alex'
			}
		}
	}
};

describe('OpenGraph - MusicPlaylist', () => {
	it('renders all playlist metadata correctly', () => {
		render(OpenGraph, { props: { data: baseMusicPlaylistData } });

		expect(getMeta('music:song')).toBe('https://example.com/song/indie-hit');
		expect(getMeta('music:song:disc')).toBe('2');
		expect(getMeta('music:song:track')).toBe('7');
		expect(getMeta('music:creator')).toBe('https://example.com/creator/alex');
	});

	it('renders only provided fields', () => {
		const partial: SEOWebPage = {
			...baseMusicPlaylistData,
			opengraph: {
				type: 'music.playlist',
				playlist: {
					url: 'https://cdn.example.com/audio/album.mp3',
					song: {
						url: 'https://example.com/song/indie-hit'
					}
				}
			}
		};

		render(OpenGraph, { props: { data: partial } });

		expect(getMeta('music:song')).toBe('https://example.com/song/indie-hit');
		expect(getMeta('music:song:disc')).toBe('');
		expect(getMeta('music:song:track')).toBe('');
		expect(getMeta('music:creator')).toBe('');
	});

	it('renders nothing if playlist is missing', () => {
		const noPlaylist: SEOWebPage = {
			...baseMusicPlaylistData,
			opengraph: {
				type: 'music.playlist'
			}
		};

		render(OpenGraph, { props: { data: noPlaylist } });

		expect(getMeta('music:song')).toBe('');
		expect(getMeta('music:song:disc')).toBe('');
		expect(getMeta('music:song:track')).toBe('');
		expect(getMeta('music:creator')).toBe('');
	});
});
