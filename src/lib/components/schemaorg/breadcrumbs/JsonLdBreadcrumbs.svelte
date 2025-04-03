<script lang="ts">
	import type { ListItem, BreadcrumbList, WithContext } from 'schema-dts';
	import { serializeJSONLdSchema, pathSegments } from '../../../utils.js';

	interface Props {
		url: string;
	}

	let { url }: Props = $props();

	const baseURL = new URL(url).origin;
	const segments = pathSegments(url);

	const itemListElement: ListItem[] = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			url: baseURL
		},
		...segments.map((segment, index) => {
			return {
				'@type': 'ListItem',
				position: index + 2,
				name: segment,
				url: `${baseURL}/${segments.slice(0, index + 1).join('/')}`
			} as const;
		})
	];

	const schemaOrgBreadcrumbList: WithContext<BreadcrumbList> = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement
	};
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgBreadcrumbList, 'jsonld-breadcrumbs')}
</svelte:head>
