# JsonLdWebPage

`JsonLdWebPage` component adds a [WebPage] schema.org type to the page header, a navigation element of the page.

## Usage

```html
<script lang="ts">
    import type { SEOWebPage } from '@indaco/sveo/types.js';
    import { JsonLdWebPage } from '@indaco/sveo/schemaorg';

    const pageData: SEOWebPage = {
        url: website.baseURL,
        title: 'Home Page',
        description: 'This is the description for the Home Page',
        keywords: 'sveltekit, components, tests, jest',
        opengraph: {
            type: OpenGraphType.Website
        },
        twitter: {
            type: TwitterCardType.Summary
        }
    }

    <JsonLdWebPage data={pageData} />
</script>
```

**Output**

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Home Page",
  "description": "This is the description for the Home Page",
  "keywords": "sveltekit, components, tests, jest"
}
</script>
```

## Properties

The `JsonLdWebPage` component exposes the following properties:

| Property | Type         | Required |
| :------- | :----------: | :------: |
| data     | [SEOWebPage] | yes      |

<!-- Resource Links -->

[SEOWebPage]: https://github.com/indaco/sveo/blob/913f83920f7f76183fc7d6ea58eebbceeb82f452/src/lib/types.ts#L34-L43
[WebPage]: https://schema.org/WebPage
