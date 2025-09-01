import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Collapsable } from "../components/collapsable"
import { Article } from "../components/article"
import { t } from '../utils/i18n'

function BlogPostTemplate({
  data: { previous, site, next, markdownRemark: post },
  location,
}: PageProps<DataProps>) {
  return (
    <Layout location={location}>
      <Article post={post} />
      <p>
        {previous && (
          <>
            <Link to={previous.fields.slug} rel="prev">
            {(t('old-journal'))}
            </Link>{" "}
          </>
        )}
        {next && (
          <>
            <Link to={next.fields.slug} rel="next">
            {(t('new-journal'))}
            </Link>{" "}
          </>
        )}
        <Link to="/blog/">{t('list-of-journals')}</Link>{" "}
        {/*<Collapsable defaultCollapsed title={"コメント"}>
          <Disqus
            config={{
              url: `${site.siteMetadata?.siteUrl}${post.fields.slug}`,
              identifier: post.fields.slug,
              title: post.frontmatter.title,
            }}
          />
        </Collapsable>*/}
      </p>
    </Layout>
  )
}

export function Head({ data: { markdownRemark: post } }: PageProps<DataProps>) {
  return (
    <Seo
      title={post.frontmatter.date}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

type DataProps = {
  site: {
    siteMetadata: {
      siteUrl: string
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
    frontmatter: {
      title?: string
      date: string
      description: string
    }
  }
  previous?: {
    fields: { slug: string }
    frontmatter: {
      date: string
    }
  }
  next?: {
    fields: { slug: string }
    frontmatter: {
      date: string
    }
  }
}

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
        date(formatString: "MMMM DD, YYYY")
        title
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
