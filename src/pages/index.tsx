import * as React from 'react';
import { Link, graphql, type PageProps } from 'gatsby';

import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

const BlogIndex: React.FC<PageProps> = function BlogIndex({ data, location }) {
  const posts = data.allMarkdownRemark.nodes.filter((node) => node.fields.slug.startsWith('/blog/'));

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      {/*
      <p>
        私は2019年からアメリカのニューヨークでソフトウェアエンジニアとして働いてます。
        日本生まれ日本育ちです。日本があまり合わず、海外に挑戦することにしました。
        もうアメリカに住み始めてまあまぁの時が経ち、永住権も手に入れて、本腰入れてニューヨークで生き抜く覚悟です。やっとアメリカという国の複雑さも理解でき始めてきました。
      </p>

      <h3>日記</h3>
      */}
      <ul id="index-post-list">
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <em>
                    {post.frontmatter.date}
                    {' - '}
                  </em>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </header>
              </article>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head() {
  return <Seo title="All posts" />;
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`;
