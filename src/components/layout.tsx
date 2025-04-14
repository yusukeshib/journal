import * as React from "react"
import { styled, createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
:root {
  --color-fg: black;
  --color-bg: white;
  --color-anchor: blue;
  --color-anchor-visited: purple;
}
body {
  font-family: serif;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
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
  color: var(--color-fg);
  &:visited {
    color: var(--color-fg);
  }
`
