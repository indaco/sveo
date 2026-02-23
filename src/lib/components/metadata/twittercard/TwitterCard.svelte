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
		<meta name="twitter:card" content={data.twitter.type} />
		<meta name="twitter:title" content={data.title} />
		{#if data.twitter.site}
			<meta name="twitter:site" content={data.twitter.site} />
		{/if}
		{#if data.description}
			<meta name="twitter:description" content={data.description} />
		{/if}
		{#if data.image?.url}
			<meta name="twitter:image" content={data.image.url} />
			{#if data.image.alt}
				<meta name="twitter:image:alt" content={data.image.alt} />
			{/if}
		{/if}

		{#if data.twitter.type === TwitterCardType.Player && data.twitter.player}
			<meta name="twitter:player" content={data.twitter.player.url} />
			<meta name="twitter:player:width" content={data.twitter.player.width.toString()} />
			<meta name="twitter:player:height" content={data.twitter.player.height.toString()} />
		{/if}

		{#if data.twitter.type === TwitterCardType.App && data.twitter.app}
			{#if data.twitter.app.country}
				<meta name="twitter:app:country" content={data.twitter.app.country} />
			{/if}
			<meta name="twitter:app:id:iphone" content={data.twitter.app.idIPhone} />
			<meta name="twitter:app:id:ipad" content={data.twitter.app.idIPad} />
			<meta name="twitter:app:id:googleplay" content={data.twitter.app.idGooglePlay} />
		{/if}
	{/if}
{/if}
