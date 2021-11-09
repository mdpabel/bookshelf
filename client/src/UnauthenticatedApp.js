import LoginRegister from './screens/Login-register';

function UnauthenticatedApp({register, login}) {
  return <LoginRegister login={login} register={register} />;
}

export default UnauthenticatedApp;
