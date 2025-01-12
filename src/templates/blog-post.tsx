import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"
import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

import { Disqus } from "gatsby-plugin-disqus"
import { useAtom } from "jotai"
import { darkModeAtom } from "../components/theme"
import { Collapsable } from "../components/collapsable"

const BlogPostTemplate: React.FC<PageProps> = function BlogPostTemplate({
  data: { previous, next, site, markdownRemark: post },
  location,
}) {
  const [darkMode] = useAtom(darkModeAtom)
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
      </article>
      <p className="main-heading">
        {previous && (
          <>
            {" "}
            <Link to={previous.fields.slug} rel="prev">
              Older
            </Link>
          </>
        )}
        {next && (
          <>
            {" "}
            <Link to={next.fields.slug} rel="next">
              Newer
            </Link>
          </>
        )}{" "}
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
      </p>
    </Layout>
  )
}

export const Head: React.FC<PageProps> = function Head({
  data: { markdownRemark: post },
}) {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

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
`
