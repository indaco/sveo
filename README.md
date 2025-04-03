
<h1 align="center">sveo</h1>
<h2 align="center" style="font-size: 1.5em;">SEO made simple for Svelte & SvelteKit.</h2>

<p align="center">
  <a href="https://github.com/indaco/sveo/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/indaco/sveo/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <a href="https://www.npmjs.com/package/@indaco/sveo" target="_blank">
    <img src="https://img.shields.io/npm/v/@indaco/sveo.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://github.com/indaco/sveo/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License: MIT" />
  </a>
</p>

## ✨ Overview

**@indaco/sveo** is a collection of type-safe SEO components for [Svelte v5](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev).
It includes support for:

- Open Graph (Facebook, LinkedIn, etc.)
- Twitter Cards
- Schema.org structured data via JSON-LD
- Basic meta tags

## 🚀 Install

```bash
# pnpm
pnpm install @indaco/sveo

# npm
npm install @indaco/sveo

# yarn
yarn add @indaco/sveo
```

## Components List

### Metadata

- [PageMetaTags]

#### OpenGraph

Includes modular components for each og:type:

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

### SchemaOrg (JSON-LD)

- JsonLdWebSite
- JsonLdWebPage
- JsonLdBreadcrumbs
- JsonLdSiteNavigationElement

All JSON-LD components automatically render <script type="application/ld+json"> safely in <svelte:head>.

## Usage

```svelte
<script>
  import { PageMetaTags } from '@indaco/sveo/metadata';

  const seo = {
    title: 'About Us',
    url: 'https://example.com/about',
    description: 'Learn more about our company',
    image: {
      url: 'https://example.com/og-image.jpg',
      alt: 'About Us Cover'
    },
    twitter: {
      type: 'summary_large_image',
      site: '@example'
    },
    opengraph: {
      type: 'article',
      article: {
        published_time: new Date(),
        section: 'Company',
        tags: ['about', 'company', 'team']
      }
    }
  };
</script>

<PageMetaTags {seo} />
```

## License

MIT - see the [License](LICENSE) file.
