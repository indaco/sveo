# JsonLdSiteNavigationElement

The `JsonLdSiteNavigationElement` component injects a [SiteNavigationElement] from Schema.org into the page as a `<script type="application/ld+json">` tag, describing the structure of the site's main navigation menu for search engines.

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

### Output

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

| Property | Type              | Required | Description                                  |
| :------- | :---------------: | :------: | :------------------------------------------- |
| baseURL  | `string`          | yes      | Base URL to prefix relative paths            |
| data     | [SEOMenuItem]`[]` | yes      | Array of menu items to include in the schema |

<!-- Resource Links -->

[SEOMenuItem]: https://github.com/indaco/sveo/blob/06de4d7c79a27f0474981cce3ebc2cf922484b09/src/lib/types.ts#L20-L27
[SiteNavigationElement]: https://schema.org/SiteNavigationElement
