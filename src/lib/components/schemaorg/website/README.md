# JsonLdWebSite

The `JsonLdWebSite` component adds a [WebSite] Schema.org type to the page in a `<script type="application/ld+json">` tag. It represents metadata about the entire website, such as its name, description, language, license, social links, and creator information.

## Usage

```html
<script lang="ts">
    import type { SEOWebSite } from '@indaco/sveo/types.js';
    import { JsonLdWebSite } from '@indaco/sveo/schemaorg';

    const siteData: SEOWebSite = {
        name: 'example.com',
        baseURL: 'https://example.com',
        language: 'en-GB',
        logo: 'logo.png',
        title: 'example',
        description: 'Example.com is your perfect fit.',
        favicon: 'favicon.ico',
        copyright: 'MIT License @ 2021-present example.com',
        keywords: ['sveltekit, components, tests, vitest'],
        contactEmail: '',
        socials: {
          github: 'https://github.com/examplecom'
        },
        creator: {
          name: 'username',
          email: 'github@example.com',
          url: 'https://yourwebgarder.com',
          jobTitle: 'webmaster',
          address: {
            city: 'City',
            state: 'CI',
            streetAddress: 'somewhere 101'
          }
        }
    }

    <JsonLdWebSite data={siteData} />
</script>
```

### Output

```html
<script type="application/ld+json" data-testid="jsonld-website">{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://example.com/#website",
  "name": "example.com",
  "url": "https://example.com",
  "description": "Example.com is your perfect fit.",
  "keywords": [
    "sveltekit, components, tests, vitest"
  ],
  "inLanguage": "en-GB",
  "license": "MIT License @ 2021-present example.com",
  "sameAs": [
    "https://github.com/examplecom"
  ],
  "creator": {
    "@type": "Person",
    "name": "username",
    "email": "github@example.com",
    "url": "https://yourwebgarder.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "City",
      "streetAddress": "somewhere 101"
    },
    "jobTitle": "webmaster"
  }
}</script>
```

## Properties

| Property | Type         | Required | Description                              |
| :------- | :----------: | :------: | :--------------------------------------- |
| data     | [SEOWebSite] | yes      | Object representing the website metadata |

<!-- Resource Links -->

[SEOWebSite]: https://github.com/indaco/sveo/blob/06de4d7c79a27f0474981cce3ebc2cf922484b09/src/lib/types.ts#L1-L14
[WebSite]: https://schema.org/WebSite
