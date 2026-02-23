<script lang="ts">
	import type { WebPage, WithContext } from 'schema-dts';
	import { serializeJSONLdSchema } from '../../../utils.js';
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();

	const schemaOrgWebPage: WithContext<WebPage> = $derived.by(() => {
		const page: WithContext<WebPage> = {
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: data.title,
			description: data.description || ''
		};

		if (data.author) page.author = data.author;
		if (data.keywords?.length) page.keywords = data.keywords;

		return page;
	});
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgWebPage, 'jsonld-webpage')}
</svelte:head>
