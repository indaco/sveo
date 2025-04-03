# JsonLdSiteNavigationElement

`JsonLdSiteNavigationElement` component adds a [SiteNavigationElement] schema.org type to the page header, a navigation element of the page.

## Usage

```html
<script lang="ts">
    import type { SEOMenuItem } from '@indaco/sveo/types.js';
    import { JsonLdSiteNavigationElement } from '@indaco/sveo/schemaorg';

    const menu: Array<SEOMenuItem> = [
    {
        identifier: 'home',
        name: 'Home',
        url: '/',
        weight: 1
    },
    {
        identifier: 'about',
        name: 'About',
        url: '/about',
        weight: 2
    }
];

    <JsonLdSiteNavigationElement baseURL="https://example.com" data={menu} />
</script>
```

**Output**

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "home",
      "url": "https://example.com/"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "about",
      "url": "https://example.com/about"
    }
  ]
}</script>
```

## Properties

The `JsonLdSiteNavigationElement` component exposes the following properties:

| Property | Type                 | Required |
| :------- | :------------------: | :------: |
| baseURL  | `string`             | yes      |
| data     | [Array<SEOMenuItem>] | yes      |

<!-- Resource Links -->

[Array<SEOMenuItem>]: https://github.com/indaco/sveo/blob/06de4d7c79a27f0474981cce3ebc2cf922484b09/src/lib/types.ts#L20-L27
[SiteNavigationElement]: https://schema.org/SiteNavigationElement
