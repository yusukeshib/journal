import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-position: outside;
`

const IndexPage: React.FC<Record<string, never>> = function IndexPage({ data }) {
  return (
    <Layout>
      <Seo title="Home" />
      <List>
        {data?.allMarkdownRemark.edges.filter(edge => !edge.node.frontmatter.hidden).map(({ node }) => {
          return (
            <li key={node.id}>
              {node.frontmatter.date}
              {` `}
              <Link to={node.frontmatter.slug}>
                {node.frontmatter.title || `Untitled`}
              </Link>
            </li>
          )
        })}
      </List>
    </Layout >
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date
            hidden
          }
        }
      }
    }
  }
`

