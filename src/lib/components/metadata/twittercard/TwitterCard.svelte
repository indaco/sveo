<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';
	import { TwitterCardType } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.twitter}
	{#if data.twitter.type}
		<meta property="twitter:card" content={data.twitter.type} />
		<meta property="twitter:title" content={data.title} />
		{#if data.twitter.site}
			<meta property="twitter:site" content={data.twitter.site} />
		{/if}
		{#if data.description}
			<meta property="twitter:description" content={data.description} />
		{/if}
		{#if data.image?.url}
			<meta property="twitter:image" content={data.image.url} />
			{#if data.image.alt}
				<meta property="twitter:image:alt" content={data.image.alt} />
			{/if}
		{/if}

		{#if data.twitter.type === TwitterCardType.Player && data.twitter.player}
			<meta property="twitter:player" content={data.twitter.player.url} />
			<meta property="twitter:player:width" content={data.twitter.player.width.toString()} />
			<meta property="twitter:player:height" content={data.twitter.player.height.toString()} />
		{/if}

		{#if data.twitter.type === TwitterCardType.App && data.twitter.app}
			{#if data.twitter.app.country}
				<meta property="twitter:app:country" content={data.twitter.app.country} />
			{/if}
			<meta property="twitter:app:id:iphone" content={data.twitter.app.idIPhone} />
			<meta property="twitter:app:id:ipad" content={data.twitter.app.idIPad} />
			<meta property="twitter:app:id:googleplay" content={data.twitter.app.idGooglePlay} />
		{/if}
	{/if}
{/if}
