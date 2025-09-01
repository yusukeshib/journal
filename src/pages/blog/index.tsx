import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"

import { Layout } from "../../components/layout"
import { Seo } from "../../components/seo"
import { useTranslation } from '../../utils/i18n'

function excerpt(html: string, limit: number) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

function ListRoute({ data, location }: PageProps<DataProps>) {
  const { t, i18n } = useTranslation()
  const posts = data.allMarkdownRemark.nodes.filter(node =>
    node.fields.slug.startsWith("/blog/")
  )

  return (
    <Layout location={location}>
      <h3>
      {t('list-of-journals')}
        </h3>
      <ul>
        {posts.map(post => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>
              {new Intl.DateTimeFormat(i18n.language, {
                dateStyle: 'full',
              }).format(new Date(post.frontmatter.date))}
            </Link>
             {' '}
             {post.frontmatter.title || excerpt(post.html, 25)}
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
      html: string
      fields: { slug: string }
      frontmatter: {
        title: string;
        date: string
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
        html
        excerpt(pruneLength: 60)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
