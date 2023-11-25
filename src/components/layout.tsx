/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import 'normalize.css'

import { Header } from "./header"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Times, serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: white;
    background-color: #111;
  }
  a {
    color: white;
  }
  ol, ul {
    padding-inline-start: 20px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 680px;
  line-height: 2em;
`

export const Layout: React.FC<{ children: React.ReactNode }> = function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
      </Container>
    </>
  )
}
