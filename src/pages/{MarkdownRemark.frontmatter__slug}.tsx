import * as React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

const Title = styled.h1`
  margin-bottom: 0.5rem;
`
const Description = styled.div`
  margin-bottom: 3rem;
`

export default function Template({ data, }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Seo title={frontmatter.title || frontmatter.date} />
      <Title>{frontmatter.title || frontmatter.date}</Title>
      <Description>
        <em>{frontmatter.date}</em>
      </Description>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
