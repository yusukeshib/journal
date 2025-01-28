import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

function ListRoute({ data, location }: PageProps<DataProps>) {
  const posts = data.allMarkdownRemark.nodes.filter(node =>
    node.fields.slug.startsWith("/blog/")
  )

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <ul>
        {posts.map(post => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>
              {post.frontmatter.date} {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default ListRoute

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head() {
  return <Seo title="All posts" />
}

type DataProps = {
  site: {
    siteMetadata: {
      title: string
      author: {
        name: string
      }
    }
  }
  allMarkdownRemark: {
    nodes: {
      excerpt: string
      html: string
      fields: { slug: string }
      frontmatter: {
        date: string
        title: string
        description: string
      }
    }[]
  }
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
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
