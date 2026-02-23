<script lang="ts">
	import { toISODateString } from '$lib/utils.js';
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();

	const times = $derived([
		['published_time', data.opengraph?.article?.published_time],
		['modified_time', data.opengraph?.article?.modified_time],
		['expiration_time', data.opengraph?.article?.expiration_time]
	] as const);
</script>

{#each times as [key, value] (key)}
	{#if value}
		<meta property={`article:${key}`} content={toISODateString(value)} />
	{/if}
{/each}

{#if data.author}
	<meta property="article:author" content={data.author} />
{/if}

{#if data.opengraph?.article?.section}
	<meta property="article:section" content={data.opengraph.article.section} />
{/if}

{#if Array.isArray(data.opengraph?.article?.tags)}
	{@const _tags = data.opengraph.article.tags}
	{#each _tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
{/if}
