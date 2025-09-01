import * as React from "react"
import { styled } from "styled-components"
import { useTranslation } from '../utils/i18n'

export function Article({
  post,
}: {
  post: {
    excerpt: string
    html: string
    fields: { slug: string }
    frontmatter: {
      title?: string
      date: string
      description: string
    }
  }
}) {
  const { t, i18n } = useTranslation()
  return (
    <ArticleContainer itemScope itemType="http://schema.org/Article">
      <header>
        <h3>{post.frontmatter.title || t('untitled')}</h3>
      </header>
      <ArticleBody
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <footer>
        <em itemProp="headline">{new Intl.DateTimeFormat(i18n.language, {
          dateStyle: 'full',
        }).format(new Date(post.frontmatter.date))}</em>
      </footer>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
  margin: 0 0 1em 0;
`

const ArticleBody = styled.section`
  margin: 0 0 1em 0;
`
