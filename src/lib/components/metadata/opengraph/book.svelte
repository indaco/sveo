<script lang="ts">
	import { toISODateString } from '$lib/utils.js';
	import type { SEOWebPage } from '../../../types.js';

	interface Props {
		data: SEOWebPage;
	}

	let { data }: Props = $props();
</script>

{#if data.opengraph?.book?.author}
	<meta property="book:author" content={data.opengraph.book.author} />
{/if}

{#if data.opengraph?.book?.isbn}
	<meta property="book:isbn" content={data.opengraph.book.isbn} />
{/if}

{#if data.opengraph?.book?.release_date}
	<meta property="book:release_date" content={toISODateString(data.opengraph.book.release_date)} />
{/if}

{#if Array.isArray(data.opengraph?.book?.tags)}
	{@const _tags = data.opengraph.book.tags}
	{#each _tags as tag (tag)}
		<meta property="book:tag" content={tag} />
	{/each}
{/if}
