<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.business?.street_address}
	<meta
		property="business:contact_data:street_address"
		content={data.opengraph.business.street_address}
	/>
{/if}

{#if data.opengraph?.business?.city}
	<meta property="business:contact_data:locality" content={data.opengraph.business.city} />
{/if}

{#if data.opengraph?.business?.state}
	<meta property="business:contact_data:region" content={data.opengraph.business.state} />
{/if}

{#if data.opengraph?.business?.postal_code}
	<meta
		property="business:contact_data:postal_code"
		content={data.opengraph.business.postal_code}
	/>
{/if}

{#if data.opengraph?.business?.country}
	<meta property="business:contact_data:country_name" content={data.opengraph.business.country} />
{/if}
