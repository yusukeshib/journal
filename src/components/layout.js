import * as React from "react"
import { Helmet } from "react-helmet";
import { Link } from "gatsby"
import { useAtom } from 'jotai'
import { createGlobalStyle } from 'styled-components'
import { darkModeAtom, DarkModeButton } from './theme'

const DarkMode = createGlobalStyle`
body {
  font-family: times, serif;
  background: ${props => props.dark ? '#222' : '#fff'};
  color: ${props => props.dark ? '#fff' : '#000'};
}
a {
  color: ${props => props.dark ? '#99f' : 'auto'};
}
`

const Layout = ({ author, location, title, children }) => {
  const [darkMode] = useAtom(darkModeAtom)
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        {title} by {author} {' '}<DarkModeButton />
      </h1>
    )
  } else {
    header = (
      <p className="main-heading">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
        {' '} by {author}{' '}<DarkModeButton />
      </p>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Helmet htmlAttributes={{ lang: 'ja', }} />
      <DarkMode dark={darkMode} />
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
