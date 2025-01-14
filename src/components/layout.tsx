import * as React from "react"
import { styled, createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
body {
  font-size: 16px;
  font-family: times, serif;
  padding: 0;
  margin: 0;
}
ul {
  padding-inline-start: 1rem;
}
`

export function Layout({
  location,
  children,
}: {
  location: { pathname: string }
  children: React.ReactNode
}) {
  const rootPath = `/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <GlobalStyle />
      <Container data-is-root-path={isRootPath}>
        <Title>
          <a href="/">Yusuke Shibata's portfolio</a>
        </Title>
        <main className="main">{children}</main>
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 1rem;
  background: #fff;
  color: #000;
  max-width: 720px;
`
const Title = styled.h1`
  font-size: 1rem;
  font-style: italic;
  font-weight: normal;
  margin: 0;
`
