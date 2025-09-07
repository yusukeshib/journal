import * as React from "react"
import { Link, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Article } from "../components/article"
import { useTranslation } from '../utils/i18n'
import { PageContext, } from '../types'

function PostTemplate({ pageContext, }: PageProps<unknown, PageContext>) {
  const { t } = useTranslation()
  return (
    <Layout>
      <Article post={pageContext.post} />
      <p>
        {pageContext.previousPost && (
          <>
            <Link to={pageContext.previousPost.fields.slug} rel="prev">
            {(t(`${pageContext.post.category}-prev`))}
            </Link>{" "}
          </>
        )}
        {pageContext.nextPost && (
          <>
            <Link to={pageContext.nextPost.fields.slug} rel="next">
            {(t(`${pageContext.post.category}-next`))}
            </Link>{" "}
          </>
        )}
        <Link to={`/${pageContext.post.category}/`}>{t(`${pageContext.post.category}-list`)}</Link>{" "}
      </p>
    </Layout>
  )
}

export function Head({ pageContext }: PageProps<unknown, PageContext>) {
  return (
    <Seo
      title={pageContext.post.frontmatter.title || pageContext.post.frontmatter.date}
      description={pageContext.post.excerpt}
    />
  )
}

export default PostTemplate

