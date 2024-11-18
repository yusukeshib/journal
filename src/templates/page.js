import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const PageTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  const author = site.siteMetadata?.author.name;
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout author={author} location={location} title={siteTitle}>
      <article
        className="page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug(
    $id: String!
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
      }
    }
  }
`

