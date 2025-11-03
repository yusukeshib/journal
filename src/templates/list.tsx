import * as React from "react"
import { Link, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { useTranslation } from '../utils/i18n'
import { ListPageContext, } from '../types'
import styled from "styled-components"

function excerpt(html: string, limit: number) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

function ListRoute({ pageContext }: PageProps<unknown, ListPageContext>) {
  const { t, i18n } = useTranslation()
  return (
    <Layout>
      <h3> {t(`${pageContext.category}-list`)} </h3>
      <List>
        {pageContext.posts.map(post => {
          const date = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium', }).format(new Date(post.frontmatter.date))
          return (
            <ListItem key={post.fields.slug}>
              <DateLabel>
                {date}
              </DateLabel>
              <Link to={post.fields.slug}>
                {excerpt(post.html ?? "", 48)}
              </Link>
            </ListItem>)
        })}
      </List>
    </Layout>
  )
}

export default ListRoute

export function Head() {
  return <Seo title="All posts" />
}

const DateLabel = styled.span`
  margin-right: 1em;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`
const ListItem = styled.li`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
