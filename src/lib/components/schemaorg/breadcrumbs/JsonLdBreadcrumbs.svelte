<script lang="ts">
	import type { ListItem, BreadcrumbList, WithContext } from 'schema-dts';
	import { serializeJSONLdSchema, pathSegments } from '../../../utils.js';

	interface Props {
		url: string;
	}

	let { url }: Props = $props();

	const baseURL = new URL(url).origin;
	const segmentsValues = pathSegments(url);
	const current = segmentsValues.pop() || '';

	const parents = segmentsValues.map((segment, index) => {
		const previousParts = segmentsValues.slice(0, index);
		return {
			label: segment,
			href: [...previousParts, segment].join('/')
		};
	});

	const itemListElement: ListItem[] = (() => {
		const rootElem = {
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			url: baseURL
		} as const;

		const parentElements = parents.map(
			(parent, index) =>
				({
					'@type': 'ListItem',
					position: 2 + index,
					name: parent.label,
					url: `${baseURL}/${parent.href}`
				}) as const
		);

		const currentElem = current
			? ({
					'@type': 'ListItem',
					position: 2 + parents.length,
					name: current,
					url
				} as const)
			: undefined;

		return currentElem ? [rootElem, ...parentElements, currentElem] : [rootElem, ...parentElements];
	})();

	const schemaOrgBreadcrumbList: WithContext<BreadcrumbList> = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement
	};
</script>

<svelte:head>
	{@html serializeJSONLdSchema(schemaOrgBreadcrumbList, 'jsonld-breadcrumbs')}
</svelte:head>
