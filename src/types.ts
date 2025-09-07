export interface Post {
  id: string;
  excerpt: string;
  html: string;
  fields: { slug: string; };
  frontmatter: { date: string; title: string };
  category: string;
}

export interface PageContext {
  post: Post;
  previousPost?: Post;
  nextPost?: Post;
}

export interface ListPageContext {
  category: string;
  posts: Post[];
}
