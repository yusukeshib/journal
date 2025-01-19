import * as React from "react"
import { styled } from "styled-components"

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
  return (
    <ArticleContainer itemScope itemType="http://schema.org/Article">
      <header>
        {post.frontmatter.title && <h1>{post.frontmatter.title}</h1>}
      </header>
      <ArticleBody
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <footer>
        <em itemProp="headline">{post.frontmatter.date}</em>
      </footer>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
  margin: 0 0 4em 0;
`

const ArticleBody = styled.section`
  font-family: times, serif;
  font-size: 20px;
  margin: 0 0 4em 0;
`
