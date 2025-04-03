<script lang="ts">
	import { toISODateString } from '$lib/utils.js';
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if Array.isArray(data.opengraph?.movie?.actor)}
	{#each data.opengraph.movie.actor as actor (actor)}
		<meta property="video:actor" content={actor.url} />
	{/each}
{/if}

{#if data.opengraph?.movie?.actorRole}
	<meta property="video:actor:role" content={data.opengraph.movie.actorRole} />
{/if}

{#if Array.isArray(data.opengraph?.movie?.director)}
	{#each data.opengraph.movie.director as director (director)}
		<meta property="video:director" content={director.url} />
	{/each}
{/if}

{#if Array.isArray(data.opengraph?.movie?.writer)}
	{#each data.opengraph.movie.writer as writer (writer)}
		<meta property="video:writer" content={writer.url} />
	{/each}
{/if}

{#if data.opengraph?.movie?.duration}
	<meta property="video:duration" content={data.opengraph.movie.duration.toString()} />
{/if}

{#if data.opengraph?.movie?.release_date}
	<meta
		property="video:release_date"
		content={toISODateString(data.opengraph.movie.release_date)}
	/>
{/if}

{#if Array.isArray(data.opengraph?.movie?.tags)}
	{@const _tags = data.opengraph?.movie?.tags}
	{#each _tags as tag (tag)}
		<meta property="video:tag" content={tag} />
	{/each}
{/if}
