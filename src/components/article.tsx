import { styled } from "styled-components"
import { Post } from "../types"

export function Article({ post, }: { post: Post; }) {
  const date = new Intl.DateTimeFormat('ja', {
    dateStyle: 'full',
  }).format(new Date(post.frontmatter.date))
  return (
    <ArticleContainer itemScope itemType="http://schema.org/Article">
      <ArticleHeader>
        <h3>{post.frontmatter.title || date}</h3>
      </ArticleHeader>
      <ArticleBody
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
  margin: 0 0 1em 0;
`

const ArticleHeader = styled.header`
  margin: 0 0 2em 0;
`
const ArticleBody = styled.section`
  margin: 0 0 3em 0;
`
