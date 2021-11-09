/**@jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link, useMatch} from 'react-router-dom';
import {border20} from '../styles/borders';
import * as colors from '../styles/colors';

function NavLink({children, ...props}) {
  const match = useMatch(props.to);
  return (
    <Link
      css={css`
        width: 100%;
        display: inline-block;
        text-decoration: none;
        color: ${colors.text};
        transition: 0.3s;
        padding: 0.5rem 0;
        margin-right: 1rem;
        &:hover {
          color: ${colors.indigo};
          background-color: ${colors.gray10};
          padding: 0.5rem 0;
          margin-right: 1rem;
        }
        ${match
          ? css`
              background-color: ${colors.gray10};
              &::before {
                content: '';
                border-left: 5px solid ${colors.indigo};
                padding: 0.6rem 0;
                margin-right: 1rem;
              }
            `
          : null}
      `}
      {...props}
    >
      {children}
    </Link>
  );
}

function Nav() {
  return (
    <nav
      css={css`
        position: sticky;
        top: 4px;
        padding: 1rem 1.5rem;
        border: ${border20};
      `}
    >
      <NavLink to="/discover">Discover</NavLink>
    </nav>
  );
}

export {NavLink, Nav};
