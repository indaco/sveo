<script lang="ts">
	import TwitterCard from '$lib/components/metadata/twittercard/TwitterCard.svelte';
	import { JsonLdSiteNavigationElements, JsonLdWebSite, PageMetaTags } from '$lib/index.js';
	import type { SEOMenuItem } from '$lib/types.js';
	import { OpenGraphType, TwitterCardType } from '$lib/types.js';
</script>

<!-- BEGIN OF USAGE NOTE: do not need to put into svelte:head -->
<PageMetaTags
	data={{
		url: 'https://example.com/posts/getting-started',
		title: 'Getting Started Article',
		description: 'This is the description for the Getting Started Article',
		author: 'Your Name',
		keywords: ['sveltekit', 'components', 'tests', 'vitest'],
		opengraph: {
			type: OpenGraphType.Article,
			article: {
				published_time: '23-01-2022',
				modified_time: '24-01-2022'
			}
		},
		twitter: {
			type: TwitterCardType.Summary,
			site: '@username'
		}
	}}
/>

<JsonLdWebSite
	data={{
		name: 'My Svelte App',
		baseURL: 'https://example.com',
		title: 'Getting Started Article',
		description: 'This is a SvelteKit site using sveo for SEO.',
		language: 'en',
		socials: {
			twitter: 'https://twitter.com/indaco',
			github: 'https://github.com/indaco'
		}
	}}
/>

<TwitterCard
	data={{
		url: 'https://example.com',
		title: 'Amazing Svelte Site',
		description: 'This site showcases the power of SvelteKit for SEO.',
		keywords: ['svelte', 'sveltekit', 'seo'],
		image: {
			url: 'https://example.com/og-image.jpg',
			alt: 'Preview of the Svelte site'
		},
		twitter: {
			type: TwitterCardType.Player,
			site: '@example',
			player: {
				url: 'https://example.com/player.html',
				width: 640,
				height: 360
			},
			app: {
				country: 'US',
				idIPhone: '1234567890',
				idIPad: '0987654321',
				idGooglePlay: 'com.example.app'
			}
		}
	}}
/>

<JsonLdSiteNavigationElements
	baseURL="https://example.com"
	data={[
		{ identifier: 'home', name: 'Home', url: '/', weight: 1 },
		{ identifier: 'about', name: 'About', url: '/about', weight: 2 },
		{
			identifier: 'github',
			name: 'GitHub',
			url: 'https://github.com/indaco',
			weight: 3,
			external: true
		}
	] satisfies SEOMenuItem[]}
/>
<!-- END OF USAGE NOTE -->

<div class="header">
	<h1>@indaco/sveo</h1>
	<h2>Demos</h2>
	<h3>Inspect the head of the webpage</h3>
</div>
