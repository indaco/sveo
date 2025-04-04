# PageMetaTags

Easily add metadata (title, canonical url, description, keywords) to your pages as well as attach [OpenGraph] and [TwitterCard] to let pages become rich objects.

## Usage

### Article Example

```html
<script lang="ts">
    import type { SEOWebPage } from '@indaco/sveo/types';
    import { OpenGraphType, TwitterCardType } from '@indaco/sveo/types';
    import { PageMetaTags } from '@indaco/sveo/metadata';

    const samplePage: SEOWebPage = {
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
    };
<script>

<PageMetaTags data={samplePage} />
```

### Music Album Example

```html
<script>
    import type { SEOWebPageMetadata } from '@indaco/sveo/types';
    import { OpenGraphType } from '@indaco/sveo/types';
    import { PageMetaTags } from '@indaco/sveo/metadata';

    const sampleMusicAlbum: SEOWebPageMetadata = {
        url: 'https://www.dgmlive.com/',
        title: 'In the Court of the Crimson King',
        description: 'Description for the album',
        keywords: 'progressive rock, jazz rock, rock',
        opengraph: {
            type: OpenGraphType.MusicAlbum,
            album: {
                url: 'https://open.spotify.com/album/6tVg2Wl9hVKMpHYcAl2V2M?si=dJtzXM7ATvmLOn9NfdDnbg',
                musicians: [
                    {
                        url: 'https://open.spotify.com/artist/7M1FPw29m5FbicYzS2xdpi?si=w9MGJ88-S3O7tiG5IheXAw'
                    }
                ],
                songs: [
                    {
                        url: 'https://open.spotify.com/track/5L7VBYoosmkmiiDlzumdCe?si=aa49699b95604f8d'
                    },
                    {
                        url: 'https://open.spotify.com/track/4QbpagjMCqSECj6IimTL2n?si=65e9458fe8454eea'
                    }
                ],
                release_date: new Date('10-10-1969')
            }
        }
    };
<script>

<PageMetaTags data={sampleMusicAlbum} />
```

## Properties

### PageMetags

| Prop   | Type         | Required | Description                                |
| :----- | :----------: | :------: | :----------------------------------------- |
| `data` | [SEOWebPage] | yes      | The SEO object containing Page metadata    |

<!-- Resource Links -->

[SEOWebPage]: https://github.com/indaco/sveo/blob/913f83920f7f76183fc7d6ea58eebbceeb82f452/src/lib/types.ts#L34-L43
[OpenGraph]: https://ogp.me/
[TwitterCard]: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
