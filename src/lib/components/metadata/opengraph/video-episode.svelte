<script lang="ts">
	import { toISODateString } from '$lib/utils.js';
	import type { SEOWebPage } from '../../../types.js';
	import VideoMovie from './video-movie.svelte';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if Array.isArray(data.opengraph?.episode?.actor)}
	{#each data.opengraph.episode.actor as actor (actor)}
		<meta property="video:actor" content={actor.url} />
	{/each}
{/if}

{#if data.opengraph?.episode?.actorRole}
	<meta property="video:actor:role" content={data.opengraph.episode.actorRole} />
{/if}

{#if Array.isArray(data.opengraph?.episode?.director)}
	{#each data.opengraph.episode.director as director (director)}
		<meta property="video:director" content={director.url} />
	{/each}
{/if}

{#if Array.isArray(data.opengraph?.episode?.writer)}
	{#each data.opengraph.episode.writer as writer (writer)}
		<meta property="video:writer" content={writer.url} />
	{/each}
{/if}

{#if data.opengraph?.episode?.duration}
	<meta property="video:duration" content={data.opengraph.episode.duration.toString()} />
{/if}

{#if data.opengraph?.episode?.release_date}
	<meta
		property="video:release_date"
		content={toISODateString(data.opengraph.episode.release_date)}
	/>
{/if}

{#if Array.isArray(data.opengraph?.episode?.tags)}
	{#each data.opengraph.episode.tags as tag (tag)}
		<meta property="video:tag" content={tag} />
	{/each}
{/if}

{#if data.opengraph?.episode?.series}
	<VideoMovie {data} />
{/if}
