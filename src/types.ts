export interface Post {
  id: string;
  excerpt: string;
  html: string;
  fields: { slug: string; };
  frontmatter: { date: string; title: string };
  category: string;
}

export interface SiteMetadata {
  title: string;
  author: {
    name: string;
  }
}

export interface PageContext {
  post: Post;
  previousPost?: Post;
  nextPost?: Post;
  siteMetadata: SiteMetadata;
}

export interface ListPageContext {
  category: string;
  posts: Post[];
  siteMetadata: SiteMetadata;
}
