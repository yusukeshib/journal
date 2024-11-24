import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';

import { Layout } from '../components/layout';

const PageTemplate: React.FC<PageProps> = function PageTemplate({ data: { markdownRemark: post }, location }) {
  return (
    <Layout location={location}>
      <article className="page" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  );
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
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
      }
    }
  }
`;
