/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import { Header } from "./header"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: white;
    background-color: #333;
    line-height: 1.5em;
  }
  a {
    color: white;
  }
  ol, ul {
    padding-inline-start: 1em;
    line-height: 1.2em;
  }
  p code {
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 0.8em;
    padding: 0.2em;
  }
  pre {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1em;
    line-height: 1.2em;
    font-size: 0.8em;
    overflow: auto;
  }
  pre code {
    background-color:transparent;
  }
  blockquote {
    position: relative;
    padding-left: 1em;
    margin: 0;
  }
  blockquote:before {
    position: absolute;
    content: '';
    width: 0.25em;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
  }
  th, td {
    padding: 0.2em;
  }

`;

const Container = styled.div`
  margin: 0 auto;
  padding: 1em;
  max-width: 42em;
`

export const Layout: React.FC<{ children: React.ReactNode }> = function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title,
          author
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header
          siteAuthor={data.site.siteMetadata.author}
          siteTitle={data.site.siteMetadata.title || `Title`}
        />
        <main>{children}</main>
      </Container>
    </>
  )
}
