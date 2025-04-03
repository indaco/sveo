<script lang="ts">
	import { toISODateString } from '$lib/utils.js';
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.album?.url}
	<meta property="og:audio" content={data.opengraph.album.url} />
{/if}

{#if data.opengraph?.album?.release_date}
	<meta
		property="music:release_date"
		content={toISODateString(data.opengraph.album.release_date)}
	/>
{/if}

{#if Array.isArray(data.opengraph?.album?.musicians)}
	{#each data.opengraph.album.musicians as musician (musician)}
		<meta property="music:musician" content={musician.url} />
	{/each}
{/if}

{#if Array.isArray(data.opengraph?.album?.songs)}
	{#each data.opengraph.album.songs as song (song)}
		<meta property="music:song" content={song.url} />
	{/each}
{/if}

{#if data.opengraph?.album?.disc}
	<meta property="music:album:disc" content={data.opengraph.album.disc.toString()} />
{/if}

{#if data.opengraph?.album?.track}
	<meta property="music:album:track" content={data.opengraph.album.track.toString()} />
{/if}
