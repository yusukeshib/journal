import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Container = styled.header`
  margin-bottom: 1rem;
  font-style: italic;
`

export const Header: React.FC<{ siteTitle: string; siteAuthor?: string; }> = function Header({ siteTitle, siteAuthor }) {
  return (
    <Container>
      <Link to="/">{siteTitle}</Link>
      {siteAuthor && <>{' '}by <Link to="/about/">{siteAuthor}</Link></>}
    </Container>
  )
}
