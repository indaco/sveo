# TwitterCard

Generate [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) meta tags using a single, type-safe Svelte component.

It supports all official Twitter Card types:

- `summary`
- `summary_large_image`
- `player`
- `app`

The component automatically renders conditional tags based on the selected card type and the fields present in `data.twitter`.

## Usage

```svelte
<script lang="ts">
  import TwitterCard from '@indaco/sveo/metadata/twittercard/TwitterCard.svelte';
  import type { SEOWebPage } from '@indaco/sveo/types';

  const seo: SEOWebPage = {
    title: 'Your Page Title',
    description: 'Page description for Twitter card.',
    image: {
      url: 'https://example.com/og-image.jpg',
      alt: 'An image for Twitter'
    },
    twitter: {
      type: 'summary_large_image',
      site: '@yourhandle'
    }
  };
</script>

<TwitterCard data={seo} />
```

Renders the following tags (based on your data):

```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="Your Page Title" />
<meta property="twitter:site" content="@yourhandle" />
<meta property="twitter:description" content="Page description for Twitter card." />
<meta property="twitter:image" content="https://example.com/og-image.jpg" />
<meta property="twitter:image:alt" content="An image for Twitter" />
```

### Example (Player Card)

```svelte
<TwitterCard
    data={{
        title: 'Watch this video!',
        description: 'Best video ever.',
        image: {
            url: 'https://example.com/video-thumbnail.jpg',
            alt: 'Video thumbnail'
        },
        twitter: {
            type: 'player',
            site: '@myapp',
            player: {
                url: 'https://example.com/embed/video',
                width: 1280,
                height: 720
            }
        }
    }}
    />
```

## Props

| Prop   | Type         | Required | Description                                |
| :----- | :----------: | :------: | :----------------------------------------- |
| `data` | [SEOWebPage] | yes      | The SEO object containing Twitter metadata |

<!-- Resource Links -->

[SEOWebPage]: https://github.com/indaco/sveo/blob/913f83920f7f76183fc7d6ea58eebbceeb82f452/src/lib/types.ts#L34-L43
