/**@jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Route, Routes} from 'react-router-dom';
import {Button} from './components/lib';
import {Nav} from './components/nav';
import BookDetails from './screens/BookDetails';
import Discover from './screens/Discover';
import FourOFour from './screens/FourOFour';
import * as mq from './styles/media-query';

const AuthenticatedApp = ({user, logout, token}) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 1rem;
          margin-right: 1rem;
          gap: 1rem;
        `}
      >
        {user?.email}
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={css`
          max-width: 850px;
          width: 100%;
          margin: 0 auto;
          padding: 3rem 1rem;
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-gap: 1rem;

          ${mq.small} {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            width: 100%;
          }
        `}
      >
        <div
          css={css`
            position: relative;
          `}
        >
          <Nav />
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <AppRoutes token={token} user={user} />
        </div>
      </div>
    </>
  );
};

function AppRoutes({user, token}) {
  return (
    <Routes>
      <Route
        path="/discover"
        element={<Discover token={token} user={user} />}
      />
      <Route path="/books/:id" element={<BookDetails token={token} />} />
      <Route path="*" element={<FourOFour />} />
    </Routes>
  );
}

export default AuthenticatedApp;
