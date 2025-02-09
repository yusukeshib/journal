import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Article } from "../components/article"

function IndexRoute({ data, location }: PageProps<DataProps>) {
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
      <Article post={posts[0]} />
      <p>
        {posts[1] && (
          <>
            <Link to={posts[1].fields.slug} rel="prev">
              古い日記
            </Link>{" "}
          </>
        )}
        <Link to="/list">リスト</Link>{" "}
        <Link to={posts[0].fields.slug}>個別ページ</Link>
      </p>
    </Layout>
  )
}

export default IndexRoute

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
    allMarkdownRemark(limit: 2, sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        html
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
