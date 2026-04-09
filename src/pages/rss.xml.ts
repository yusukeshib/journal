import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getSortedPosts, getPostUrl } from '../lib/posts'

export async function GET(context: APIContext) {
  const posts = await getSortedPosts()
  return rss({
    title: 'Journal by Yusuke',
    description: "Yusuke's website",
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title || post.data.date.toISOString().slice(0, 10),
      pubDate: post.data.date,
      link: getPostUrl(post),
      description: post.body?.slice(0, 160) || '',
    })),
  })
}
