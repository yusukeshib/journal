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

export function plainText(markdown: string, limit: number): string {
  const text = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~`>]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  return text.length > limit ? text.slice(0, limit) + '...' : text
}
