<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.playlist?.song}
	<meta property="music:song" content={data.opengraph.playlist.song.url} />
{/if}

{#if data.opengraph?.playlist?.disc}
	<meta property="music:song:disc" content={data.opengraph.playlist.disc.toString()} />
{/if}

{#if data.opengraph?.playlist?.track}
	<meta property="music:song:track" content={data.opengraph.playlist.track.toString()} />
{/if}

{#if data.opengraph?.playlist?.creator}
	<meta property="music:creator" content={data.opengraph.playlist.creator.url} />
{/if}
