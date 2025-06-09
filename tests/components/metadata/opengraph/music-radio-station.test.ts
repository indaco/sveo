import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { OpenGraph } from '../../../../src/lib/components/metadata/opengraph/index.js';
import { OpenGraphType, type SEOWebPage } from '../../../../src/lib/types';
import { getMeta } from '../../../testutils.js';

describe('OpenGraph - MusicRadioStation', () => {
	it('renders music:creator meta tag correctly', () => {
		const data: SEOWebPage = {
			url: 'https://example.com/radio',
			title: 'Indie Radio',
			opengraph: {
				type: OpenGraphType.MusicRadioStation,
				radioStation: {
					creator: {
						url: 'https://example.com/creator/alex'
					}
				}
			}
		};

		render(OpenGraph, { props: { data } });

		expect(getMeta('music:creator')).toBe('https://example.com/creator/alex');
	});

	it('renders nothing when radioStation.creator is undefined', () => {
		const data: SEOWebPage = {
			url: 'https://example.com/radio',
			title: 'Silent Station',
			opengraph: {
				type: OpenGraphType.MusicRadioStation,
				radioStation: {}
			}
		};

		render(OpenGraph, { props: { data } });

		expect(getMeta('music:creator')).toBe('');
	});
});
