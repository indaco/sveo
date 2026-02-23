<script lang="ts">
	import type { ItemList, WithContext } from 'schema-dts';
	import { serializeJSONLdSchema } from '../../../utils.js';
	import type { SEOMenuItem } from '../../../types.js';

	interface Props {
		baseURL: string;
		data: SEOMenuItem[];
	}

	let { baseURL, data }: Props = $props();

	const schemaOrgSiteNavigationElement: WithContext<ItemList> = $derived.by(() => ({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: data.map((elem) => ({
			'@type': 'SiteNavigationElement' as const,
			position: elem.weight,
			name: elem.name,
			url: elem.external ? elem.url : `${baseURL}${elem.url}`
		}))
	}));
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgSiteNavigationElement, 'jsonld-sitenavigationelements')}
</svelte:head>
