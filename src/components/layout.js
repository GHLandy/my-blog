import React from 'react';
import { Link } from 'gatsby';
import GithubStats from './githubstats';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>

      {isRootPath && <GithubStats />}

      <main>{children}</main>

      <footer>
        Copyright &copy; {new Date().getFullYear()} &nbsp;
        <a href="https://github.com/GHLandy">GHLandy</a>, Built with &nbsp;
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
