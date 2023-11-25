import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Container = styled.header`
  margin-bottom: 1rem;
`

export const Header: React.FC<{ siteTitle?: string }> = function Header({ siteTitle = '' }) {
  return (
    <Container>
      <Link to="/">{siteTitle}</Link>
    </Container>
  )
}
