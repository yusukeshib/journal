import * as React from "react"
import { Link } from "gatsby"
import { ThemeStyles, DarkModeButton } from './theme'

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <DarkModeButton />
      </h1>
    )
  } else {
    header = (
      <p className="main-heading">
        <DarkModeButton />
        {' '}
        <Link className="header-link-home" to="/">
          インデックスに戻る
        </Link>
      </p>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <ThemeStyles />
      <header className="global-header">{header}</header>
      <main className="main">{children}</main>
    </div>
  )
}

export default Layout
