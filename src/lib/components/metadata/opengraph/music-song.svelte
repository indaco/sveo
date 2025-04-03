<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.song?.url}
	<meta property="og:audio" content={data.opengraph.song.url} />
{/if}

{#if data.opengraph?.song?.duration}
	<meta property="music:duration" content={data.opengraph.song.duration.toString()} />
{/if}

{#if Array.isArray(data.opengraph?.song?.album)}
	{#each data.opengraph.song.album as album (album)}
		<meta property="music:album" content={album.url} />
	{/each}
{/if}

{#if data.opengraph?.song?.disc}
	<meta property="music:album:disc" content={data.opengraph.song.disc.toString()} />
{/if}

{#if data.opengraph?.song?.track}
	<meta property="music:album:track" content={data.opengraph.song.track.toString()} />
{/if}

{#if Array.isArray(data.opengraph?.song?.musician)}
	{#each data.opengraph.song.musician as musician (musician)}
		<meta property="music:musician" content={musician.url} />
	{/each}
{/if}
