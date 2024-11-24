import * as React from 'react';
import { Link, graphql, type PageProps } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import { useAtom } from 'jotai';

import { Layout } from '../components/layout';
import { Seo } from '../components/seo';
import { darkModeAtom } from '../components/theme';
import { Collapsable } from '../components/collapsable';

const BlogPostTemplate: React.FC<PageProps> = function BlogPostTemplate({
  data: {
    previous, next, site, markdownRemark: post,
  },
  location,
}) {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <Layout location={location}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>
            <em>{post.frontmatter.date}</em>
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← 古いエントリー
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                新しいエントリー →
              </Link>
            )}
          </li>
        </ul>
        <hr />
        <Collapsable>
          <Disqus
            key={`disqus-${darkMode}`}
            config={{
              url: `${site.siteMetadata?.siteUrl}${post.fields.slug}`,
              identifier: post.fields.slug,
              title: post.frontmatter.title,
            }}
          />
        </Collapsable>
      </nav>
    </Layout>
  );
}

export const Head: React.FC<PageProps> = function Head({ data: { markdownRemark: post } }) {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        siteUrl
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
