# OpenGraph

The `OpenGraph` component provides a comprehensive and type-safe way to generate Open Graph `<meta>` tags for your Svelte or SvelteKit application.

It is the **only exported component** for Open Graph, and it **automatically handles conditional rendering** of all supported subtypes (e.g. article, book, video, music) internally.

## Supported Open Graph Types

The component supports official Open Graph object types, including:

| Type                           | Description                               |
| :----------------------------- | :---------------------------------------- |
| `website`                      | Basic OG meta (title, description, image) |
| `article`                      | Adds `article:*` tags like author, tags   |
| `book`                         | ISBN, release date, and tags              |
| `profile`                      | Personal metadata                         |
| `business.business`            | Contact information                       |
| `product`                      | Product-specific metadata                 |
| `music.song`                   | Song metadata                             |
| `music.album`                  | Album-level metadata                      |
| `music.playlist`               | Playlist metadata                         |
| `music.radio_station`          | Radio metadata                            |
| `video.movie`                  | Movie metadata                            |
| `video.episode`                | Episode metadata (also includes movie)    |
| `video.tv_show`, `video.other` | Handled like movie                        |

## Usage Example (Article)

To use the `OpenGraph` component, pass a typed `SEOWebPage` object with an `opengraph` field and `type`.

```svelte
<script lang="ts">
    import { OpenGraphType, TwitterCardType } from '@indaco/sveo/types';
import type { SEOWebPage } from '@indaco/sveo/types';

const sampleArticle: SEOWebPage = {
    url: 'https://example.com/posts/getting-started',
    title: 'Getting Started Article',
    description: 'This is the description for the Getting Started Article',
    author: 'Mirco Veltri',
    keywords: ['sveltekit, components, tests, vitest'],
    opengraph: {
        type: OpenGraphType.Article,
        article: {
            tags: ['sveltekit'],
            published_time: '23-01-2022',
            modified_time: '24-01-2022'
        }
    },
    twitter: {
        type: TwitterCardType.Large,
        site: '@indaco'
    }
};
</script>

<OpenGraph data={sampleArticle} />
```
