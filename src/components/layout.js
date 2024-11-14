import * as React from "react"
import { Link } from "gatsby"
import { ThemeStyles, DarkModeButton } from './theme'

const Layout = ({ author, location, title, children }) => {
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
      <ThemeStyles />
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
