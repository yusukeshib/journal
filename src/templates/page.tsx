import * as React from "react"
import { graphql, type PageProps } from "gatsby"
import { Layout } from "../components/layout"

function PageTemplate({
  data: { markdownRemark: post },
  location,
}: PageProps<DataProps>) {
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
  )
}

export default PageTemplate

type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string
      title: string
      author: {
        name: string
      }
    }
  }
  markdownRemark: {
    id: string
    excerpt: string
    html: string
    fields: { slug: string }
    frontmatter: { title: string }
  }
}

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
`
