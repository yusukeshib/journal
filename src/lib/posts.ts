import { getCollection, type CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blog'>

export async function getSortedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.hidden)
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
}

export function getPostUrl(post: BlogPost): string {
  return `/blog/${post.id}/`
}

export function getPostNavigation(posts: BlogPost[], currentId: string) {
  const index = posts.findIndex(p => p.id === currentId)
  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}

export function excerpt(html: string, limit: number): string {
  const text = html.replace(/<[^>]+>/g, '')
  return text.length > limit ? text.slice(0, limit) + '...' : text
}
