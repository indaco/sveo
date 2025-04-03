<script lang="ts">
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.product?.plural_title}
	<meta property="product:plural_title" content={data.opengraph.product.plural_title} />
{/if}

{#if data.opengraph?.product?.price}
	<meta property="product:price.amount" content={data.opengraph.product.price.toString()} />
{/if}

{#if data.opengraph?.product?.currency}
	<meta property="product:price.currency" content={data.opengraph.product.currency} />
{/if}
