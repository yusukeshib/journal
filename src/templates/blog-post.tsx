import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"
import { styled } from "styled-components"
import { Disqus } from "gatsby-plugin-disqus"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

function BlogPostTemplate({
  data: { previous, next, markdownRemark: post },
  location,
}: PageProps<DataProps>) {
  return (
    <Layout location={location}>
      <Article itemScope itemType="http://schema.org/Article">
        <header>
          {post.frontmatter.title && <h1>{post.frontmatter.title}</h1>}
          <Date itemProp="headline">{post.frontmatter.date}</Date>
        </header>
        <ArticleBody
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </Article>
      <p>
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
        {/*<Collapsable>
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

const Article = styled.article`
  margin: 0 0 4em 0;
`

const ArticleBody = styled.section`
  font-family: times, serif;
  font-size: 20px;
`

const Date = styled.h1`
  font-size: 1em;
  font-weight: normal;
`

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
