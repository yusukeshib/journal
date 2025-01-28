import * as React from "react"
import { styled, createGlobalStyle } from "styled-components"
import { Link } from "gatsby"

const GlobalStyle = createGlobalStyle`
:root {
  --color-fg: white;
  --color-bg: #18140c;
  --color-anchor: #6c93ff;
  --color-anchor-visited: #ab88ff;
}
body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-bg);
}
a {
  color: var(--color-anchor);
  &:visited {
    color: var(--color-anchor-visited);
  }
}
ul, ol {
  padding-inline-start: 1em;
}
`

export function Layout({
  location,
  children,
}: {
  location: { pathname: string }
  children: React.ReactNode
}) {
  return (
    <>
      <GlobalStyle />
      <RootContainer>
      <Container>
        <Header>
          <Title href="/">Journal by Yusuke</Title>{/*(<Link to="/cv/">who?</Link>)*/}
        </Header>
        <main>{children}</main>
      </Container>
      </RootContainer>
    </>
  )
}

const RootContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Container = styled.div`
  box-sizing: border-box;
  padding: 1em;
  background: var(--color-bg);
  color: var(--color-fg);
  max-width: 720px;
  width: 100%;
`
const Header = styled.div`
  margin: 0 0 4rem;
`
const Title = styled.a`
  font-size: 1em;
  font-style: italic;
  color: var(--color-fg);
  &:visited {
    color: var(--color-fg);
  }
`
