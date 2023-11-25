/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export const Seo: React.FC<{
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  title: string;
}> = function Seo({
  description = '',
  lang = 'en',
  meta = [],
  title
}) {
    const { site } = useStaticQuery(
      graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title

    return (
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={defaultTitle ? `%s / ${defaultTitle}` : null}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ].concat(meta)}
      />
    )
  }
