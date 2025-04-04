
<h1 align="center">sveo</h1>
<h2 align="center" style="font-size: 1.5em;">SEO made simple for Svelte & SvelteKit.</h2>

<p align="center">
  <a href="https://github.com/indaco/sveo/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/indaco/sveo/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <a href="https://codecov.io/gh/indaco/sveo">
    <img src="https://codecov.io/gh/indaco/sveo/branch/main/graph/badge.svg" alt="Codecov" />
  </a>
  <a href="https://www.npmjs.com/package/@indaco/sveo" target="_blank">
    <img src="https://img.shields.io/npm/v/@indaco/sveo.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://github.com/indaco/sveo/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License: MIT" />
  </a>
</p>

## Overview

**@indaco/sveo** is a collection of type-safe SEO components for [Svelte v5](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev). It provides a simple and declarative way to manage SEO and metadata using components.

### Features

- Type-safe SEO components
- Works with both Svelte and SvelteKit
- Supports all major SEO standards:
  - Open Graph (Facebook, LinkedIn, etc.)
  - Twitter Cards
  - Schema.org JSON-LD
  - Standard meta tags
- Fully tree-shakable and modular
- No runtime JavaScript – All components render static tags inside <svelte:head>, so nothing is shipped to the client.

## Install

```bash
# pnpm
pnpm add -D @indaco/sveo

# npm
npm install --save-dev @indaco/sveo

# yarn
yarn add --dev @indaco/sveo
```

## Components List

### Metadata

Start with [`PageMetaTags`] for essential metadata like `<title>`, `<meta name="description">`, and other common tags that support SEO and social previews.

- [PageMetaTags] – A lightweight component to manage basic metadata inside `<svelte:head>`.

#### OpenGraph

Enhance your content's visibility on platforms like Facebook, LinkedIn, and others with modular components that map to Open Graph's `og:type`. Each component is designed to be composable and type-safe.

Available types:

- Article
- Book
- Business
- Profile
- Product
- MusicSong
- MusicAlbum
- MusicPlaylist
- MusicRadioStation
- VideoMovie
- VideoEpisode

Each component renders relevant `<meta property="og:*">` tags automatically based on the data you provide.

[Learn how to use the OpenGraph component](src/lib/components/metadata/opengraph/README.md)

#### TwitterCard

A flexible component that generates meta tags for [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup) using a single prop: `data`, typed as `SEOWebPage`.

It supports all official Twitter Card types:

- `summary`
- `summary_large_image`
- `player`
- `app`

The component automatically renders conditional tags based on the selected card type and the fields present in `data.twitter`.

[Learn how to use the TwitterCard component](src/lib/components/metadata/twittercard/README.md)

### SchemaOrg (JSON-LD)

Leverage structured data with ready-to-use components for common [Schema.org](https://schema.org/) types. These components help improve search engine understanding and support rich results in platforms like Google, Bing, and social media.

Each component accepts a simple, type-safe data object and renders a `<script type="application/ld+json">` block safely within `<svelte:head>`.

- [JsonLdWebSite]
- [JsonLdWebPage]
- [JsonLdBreadcrumbs]
- [JsonLdSiteNavigationElement]

See the linked _READMEs_ for detailed usage examples and supported properties.

## Usage

You can use any SEO component inside your route files or layout components. Here’s a minimal example:

```svelte
<script>
  import type { OpenGraphType, TwitterCardType, SEOMenuItem } from '@indaco/sveo/types';
  import PageMetaTags from '@indaco/sveo/metadata/PageMetaTags.svelte'
  import TwitterCard from '@indaco/sveo/metadata/twittercard/TwitterCard.svelte';
  import JsonLdWebSite from '@indaco/sveo/schemaorg/website/JsonLdWebSite.svelte'
</script>

<PageMetaTags
  data={{
    url: 'https://example.com/posts/getting-started',
    title: 'Getting Started Article',
    description: 'This is the description for the Getting Started Article',
    author: 'Your Name',
    keywords: ['sveltekit', 'components', 'tests', 'vitest'],
    opengraph: {
      type: OpenGraphType.Article,
      article: {
        published_time: '23-01-2022',
        modified_time: '24-01-2022'
      }
    },
    twitter: {
      type: TwitterCardType.Large,
      site: '@username'
    }
  }}
/>

<JsonLdWebSite
  data={{
    name: 'My Svelte App',
    baseURL: 'https://example.com',
    title: 'Getting Started Article',
    description: 'This is a SvelteKit site using sveo for SEO.',
    language: 'en',
    socials: {
      twitter: 'https://twitter.com/indaco',
      github: 'https://github.com/indaco'
    }
  }}
/>

<JsonLdSiteNavigationElements
  baseURL="https://example.com"
  data={[
    { identifier: 'home', name: 'Home', url: '/', weight: 1 },
    { identifier: 'about', name: 'About', url: '/about', weight: 2 },
    {
      identifier: 'github',
      name: 'GitHub',
      url: 'https://github.com/indaco',
      weight: 3,
      external: true
    }
  ] satisfies Array<SEOMenuItem>}
/>

<TwitterCard
  data={{
    url: 'https://example.com',
    title: 'Amazing Svelte Site',
    description: 'This site showcases the power of SvelteKit for SEO.',
    keywords: ['svelte', 'sveltekit', 'seo'],
    image: {
      url: 'https://example.com/og-image.jpg',
      alt: 'Preview of the Svelte site'
    },
    twitter: {
      type: TwitterCardType.Player,
      site: '@example',
      player: {
        url: 'https://example.com/player.html',
        width: 640,
        height: 360
      },
      app: {
        country: 'US',
        idIPhone: '1234567890',
        idIPad: '0987654321',
        idGooglePlay: 'com.example.app'
      }
    }
  }}
/>
```

## License

MIT - see the [License](LICENSE) file.

<!-- Resource Links -->
[PageMetaTags]: src/lib/components/metadata/README.md
[JsonLdWebSite]: src/lib/components/schemaorg/website/README.md
[JsonLdWebPage]: src/lib/components/schemaorg/webpage/README.md
[JsonLdBreadcrumbs]: src/lib/components/schemaorg/breadcrumbs/README.md
[JsonLdSiteNavigationElement]: src/lib/components/schemaorg/sitenavigationelements/README.md
