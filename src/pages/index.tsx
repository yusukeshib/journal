import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Article } from "../components/article"
import { useTranslation } from '../utils/i18n'

function IndexRoute({ data, location }: PageProps<DataProps>) {
  const { t } = useTranslation()
  const posts = data.allMarkdownRemark.nodes.filter(node =>
    node.fields.slug.startsWith("/blog/")
  )

  return (
    <Layout location={location}>
      <h2>{t('ongoing-projects')}</h2>
      <p>
        色々とここに書いていきます。
      </p>
      <h2>{t('latest-journal')}</h2>
      <Article post={posts[0]} />
      <p>
        {posts[1] && (
          <>
            <Link to={posts[1].fields.slug} rel="prev">
            {t('old-journal')}
            </Link>{" "}
          </>
        )}
        <Link to="/blog/">{t('list-of-journals')}</Link>{" "}
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
