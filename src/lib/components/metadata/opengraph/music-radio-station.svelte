<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.radioStation?.creator}
	<meta property="music:creator" content={data.opengraph.radioStation.creator.url} />
{/if}
