/**@jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import AuthenticatedApp from './AuthenticatedApp';
import './styles';
import UnauthenticatedApp from './UnauthenticatedApp';
import {BrowserRouter as Router} from 'react-router-dom';
import * as authProvider from './auth-provider';
import {FullPageSpinner} from './components/lib';
import {useEffect} from 'react';
import {client} from './utils/api-client';
import {useAsync} from './hooks/useAsync';
import * as colors from './styles/colors';

async function getUser() {
  let user = null;

  const token = await authProvider.getToken();
  if (token) {
    const data = await client('auth/me', {token});
    user = data;
  }

  return user;
}

const App = () => {
  const {
    isSuccess,
    isLoading,
    isIdle,
    isError,
    data: user,
    error,
    setData,
    run,
  } = useAsync();

  useEffect(() => {
    run(getUser());
  }, [run]);

  const login = (u, p) => authProvider.login(u, p).then((u) => setData(u));

  const register = (u, p) =>
    authProvider.register(u, p).then((u) => setData(u));

  const logout = () => {
    authProvider.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return (
      <div
        css={css`
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <FullPageSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        css={css`
          color: ${colors.danger};
        `}
      >
        <p>There is a problem. Try refreshing the App</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return user ? (
      <Router>
        <AuthenticatedApp
          token={user?.token}
          user={user?.data}
          logout={logout}
        />
      </Router>
    ) : (
      <UnauthenticatedApp register={register} login={login} />
    );
  }
};

export default App;
