<script lang="ts">
	import type { SEOWebPage } from '../../types.js';
	import { OpenGraph } from './opengraph/index.js';
	import { TwitterCard } from './twittercard/index.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<link rel="canonical" href={data.url} />
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
	{#if data.keywords?.length}
		<meta name="keywords" content={data.keywords.join(', ')} />
	{/if}

	<OpenGraph {data} />

	<TwitterCard {data} />
</svelte:head>
