import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { sampleArticle } from '../../../fixtures/sample.js';
import { TwitterCard } from '../../../../src/lib/components/metadata/twittercard/index.js';

function getMeta(metaName: string): string | null {
	const metas = document.getElementsByTagName('meta');
	for (let i = 0; i < metas.length; i++) {
		const el = metas[i];
		if (
			el.getAttribute('name') === metaName ||
			el.getAttribute('itemprop') === metaName ||
			el.getAttribute('property') === metaName
		) {
			return el.getAttribute('content');
		}
	}
	return null;
}

function renderCard(props) {
	document.head.innerHTML = '';
	render(TwitterCard, { props });
}

describe('TwitterCard', () => {
	it('should render all Twitter meta tags', () => {
		renderCard({ data: sampleArticle });

		expect(getMeta('twitter:card')).toBe('summary_large_image');
		expect(getMeta('twitter:site')).toBe(sampleArticle.twitter?.site);
		expect(getMeta('twitter:title')).toBe(sampleArticle.title);
		expect(getMeta('twitter:description')).toBe(sampleArticle.description);
	});

	it('should fallback when twitter data is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		delete articleClone.twitter;

		renderCard({ data: articleClone });

		expect(getMeta('twitter:card')).toBeNull();
		expect(getMeta('twitter:site')).toBeNull();
		expect(getMeta('twitter:title')).toBeNull();
		expect(getMeta('twitter:description')).toBeNull();
	});

	it('should skip twitter:site if not defined', () => {
		const articleClone = structuredClone(sampleArticle);
		delete articleClone.twitter.site;

		renderCard({ data: articleClone });

		expect(getMeta('twitter:card')).toBe('summary_large_image');
		expect(getMeta('twitter:site')).toBeNull(); // should not exist
	});

	it('should handle missing description', () => {
		const articleClone = structuredClone(sampleArticle);
		delete articleClone.description;

		renderCard({ data: articleClone });

		expect(getMeta('twitter:description')).toBeNull();
	});

	it('should handle missing title', () => {
		const articleClone = structuredClone(sampleArticle);
		delete articleClone.title;

		renderCard({ data: articleClone });

		expect(getMeta('twitter:title')).toBeNull();
	});

	it('should render twitter:image and twitter:image:alt when both are defined', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.image = {
			url: 'https://example.com/preview.png',
			alt: 'Preview image'
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:image')).toBe(articleClone.image.url);
		expect(getMeta('twitter:image:alt')).toBe(articleClone.image.alt);
	});

	it('should not render twitter:image or twitter:image:alt when url is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.image = { alt: 'Alt text' }; // no url

		renderCard({ data: articleClone });

		expect(getMeta('twitter:image')).toBeNull();
		expect(getMeta('twitter:image:alt')).toBeNull();
	});

	it('should render twitter:image but not twitter:image:alt when alt is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.image = { url: 'https://example.com/img.jpg' };

		renderCard({ data: articleClone });

		expect(getMeta('twitter:image')).toBe(articleClone.image.url);
		expect(getMeta('twitter:image:alt')).toBeNull();
	});

	it('should render twitter:player tags when type is Player and player data is provided', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'player',
			player: {
				url: 'https://example.com/player',
				width: '640',
				height: '360'
			}
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:player')).toBe(articleClone.twitter.player.url);
		expect(getMeta('twitter:player:width')).toBe(articleClone.twitter.player.width);
		expect(getMeta('twitter:player:height')).toBe(articleClone.twitter.player.height);
	});

	it('should not render twitter:player tags if player data is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'player'
			// no player property
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:player')).toBeNull();
		expect(getMeta('twitter:player:width')).toBeNull();
		expect(getMeta('twitter:player:height')).toBeNull();
	});

	it('should not render twitter:player tags if type is not Player', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'summary_large_image',
			player: {
				url: 'https://example.com/player',
				width: '640',
				height: '360'
			}
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:player')).toBeNull();
		expect(getMeta('twitter:player:width')).toBeNull();
		expect(getMeta('twitter:player:height')).toBeNull();
	});

	it('should render all twitter:app tags when type is App and app data is provided', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'app',
			app: {
				country: 'US',
				idIPhone: '123456',
				idIPad: '654321',
				idGooglePlay: 'com.example.app'
			}
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:app:country')).toBe(articleClone.twitter.app.country);
		expect(getMeta('twitter:app:id:iphone')).toBe(articleClone.twitter.app.idIPhone);
		expect(getMeta('twitter:app:id:ipad')).toBe(articleClone.twitter.app.idIPad);
		expect(getMeta('twitter:app:id:googleplay')).toBe(articleClone.twitter.app.idGooglePlay);
	});

	it('should not render twitter:app:country if country is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'app',
			app: {
				idIPhone: '123456',
				idIPad: '654321',
				idGooglePlay: 'com.example.app'
				// country missing
			}
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:app:country')).toBeNull();
		expect(getMeta('twitter:app:id:iphone')).toBe(articleClone.twitter.app.idIPhone);
		expect(getMeta('twitter:app:id:ipad')).toBe(articleClone.twitter.app.idIPad);
		expect(getMeta('twitter:app:id:googleplay')).toBe(articleClone.twitter.app.idGooglePlay);
	});

	it('should not render twitter:app tags if app data is missing', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'app'
			// app field missing
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:app:country')).toBeNull();
		expect(getMeta('twitter:app:id:iphone')).toBeNull();
		expect(getMeta('twitter:app:id:ipad')).toBeNull();
		expect(getMeta('twitter:app:id:googleplay')).toBeNull();
	});

	it('should not render twitter:app tags if type is not App', () => {
		const articleClone = structuredClone(sampleArticle);
		articleClone.twitter = {
			type: 'summary_large_image',
			app: {
				country: 'US',
				idIPhone: '123456',
				idIPad: '654321',
				idGooglePlay: 'com.example.app'
			}
		};

		renderCard({ data: articleClone });

		expect(getMeta('twitter:app:country')).toBeNull();
		expect(getMeta('twitter:app:id:iphone')).toBeNull();
		expect(getMeta('twitter:app:id:ipad')).toBeNull();
		expect(getMeta('twitter:app:id:googleplay')).toBeNull();
	});
});
