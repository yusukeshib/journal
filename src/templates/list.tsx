import * as React from "react"
import { Link, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { useTranslation } from '../utils/i18n'
import { ListPageContext, } from '../types'

function excerpt(html: string, limit: number) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

function ListRoute({ pageContext }: PageProps<unknown, ListPageContext>) {
  const { t, i18n } = useTranslation()
  return (
    <Layout>
      <h3> {t(`${pageContext.category}-list`)} </h3>
      <ul>
        {pageContext.posts.map(post => {
          const date = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'full', }).format(new Date(post.frontmatter.date))
          return (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>{date}</Link>
            {" "}{excerpt(post.html ?? "", 25)}
          </li>)
        })}
        </ul>
    </Layout>
  )
}

export default ListRoute

export function Head() {
  return <Seo title="All posts" />
}
