import * as React from "react"

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
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <h1 className="main-heading">
        <a href="/">Yusuke Shibata's portfolio</a>
      </h1>
      <main className="main">{children}</main>
    </div>
  )
}
