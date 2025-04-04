# JsonLdBreadcrumbs

The `JsonLdBreadcrumbs` component adds a [BreadcrumbList] to the page header as [structured data]. This helps search engines understand the page's position within the site hierarchy and enhances rich results in search listings.

A `BreadcrumbList` is an [ItemList] consisting of a chain of linked web pages, typically ending with the current page.

## Usage

```html
<script>
    import { JsonLdBreadcrumbs } from '@indaco/sveo/schemaorg';

    <JsonLdBreadcrumbs url="https://example.com/blog/welcome" />
</script>
```

### Output

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "url": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "blog",
      "url": "https://example.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "welcome",
      "url": "https://example.com/blog/welcome"
    }
  ]
}</script>

```

### With SvelteKit

```html
<script>
    import { page } from '$app/stores';
    import { JsonLdBreadcrumbs } from '@indaco/sveo/schemaorg';

    <JsonLdBreadcrumbs url={$page.url.href} />
</script>
```

## Properties

| Property  | Type     | Required | Description                      |
| :-------- | :------: | :------: | :------------------------------- |
| url       | `string` |    yes   | Absolute URL of the current page |

[structured data]: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
[BreadcrumbList]: https://schema.org/BreadcrumbList
[ItemList]: https://schema.org/ItemList
