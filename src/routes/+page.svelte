<script lang="ts">
	import {
		JsonLdSiteNavigationElements,
		JsonLdWebPage,
		JsonLdWebSite,
		PageMetaTags
	} from '$lib/index.js';

	import { homePage, website, menu } from '../../tests/fixtures/sample.js';
</script>

<!-- BEGIN OF USAGE NOTE: do not need to put into svelte:head -->
<PageMetaTags data={homePage} />
<JsonLdWebSite data={website} />
<JsonLdSiteNavigationElements baseURL={website.baseURL} data={menu} />
<JsonLdWebPage data={homePage} />
<!-- END OF USAGE NOTE -->

<div class="header">
	<h1>@indaco/sveo</h1>
	<h2>Demos</h2>
	<h3>Inspect the head of the webpage</h3>
</div>
