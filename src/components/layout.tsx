import * as React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import { useAtom } from 'jotai';
import { DarkModeButton, darkModeAtom } from './theme';

export const Layout: React.FC<{
  location: { pathname: string; };
  children: React.ReactNode;
}> = function Layout({ location, children }) {
  const [darkMode] = useAtom(darkModeAtom);
  // const rootPath = `${__PATH_PREFIX__}/`;
  const rootPath = `/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <DarkModeButton />
        {' '}
        yusuke's website
      </h1>
    );
  } else {
    header = (
      <p className="main-heading">
        <DarkModeButton />
        <Link className="header-link-home" to="/">
          インデックスに戻る
        </Link>
      </p>
    );
  }

  return (
    <div
      className={cx('global-wrapper', darkMode ? 'dark' : 'light')}
      data-is-root-path={isRootPath}
    >
      <div className="global">
        <header className="global-header">{header}</header>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
