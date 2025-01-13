import * as React from "react"
import cx from "classnames"
// import { useAtom } from "jotai"
// import { darkModeAtom } from "./theme"

export function Layout({
  location,
  children,
}: {
  location: { pathname: string }
  children: React.ReactNode
}) {
  const darkMode = false
  // const [darkMode] = useAtom(darkModeAtom)
  // const rootPath = `${__PATH_PREFIX__}/`;
  const rootPath = `/`
  const isRootPath = location.pathname === rootPath

  return (
    <div
      className={cx("global-wrapper", darkMode ? "dark" : "light")}
      data-is-root-path={isRootPath}
    >
      <div className="global">
        <h1 className="main-heading">
          <a href="/">Yusuke Shibata's portfolio</a>
        </h1>
        <main className="main">{children}</main>
      </div>
    </div>
  )
}
