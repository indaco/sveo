<script lang="ts">
	import type { ItemList, SiteNavigationElement, WithContext } from 'schema-dts';
	import { serializeJSONLdSchema } from '../../../utils.js';
	import type { SEOMenuItem } from '../../../types.js';

	interface Props {
		baseURL: string;
		data: SEOMenuItem[];
	}

	let { baseURL, data }: Props = $props();

	function makeSiteNavigationElementList(data: SEOMenuItem[]): SiteNavigationElement[] {
		return Array.isArray(data)
			? data.map((elem) => ({
					'@type': 'SiteNavigationElement',
					position: elem.weight,
					name: elem.name,
					url: elem.external ? elem.url : `${baseURL}${elem.url}`
				}))
			: [];
	}

	const schemaOrgSiteNavigationElement: WithContext<ItemList> = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: makeSiteNavigationElementList(data)
	};
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgSiteNavigationElement, 'jsonld-sitenavigationelements')}
</svelte:head>
