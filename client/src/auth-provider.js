const authURI = process.env.REACT_APP_API_URL;

const localStorageKey = '__auth_provider_token__';

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.data.token);
  return data.data.token;
}

function register(user, password) {
  return client('user/signup', {email: user, password: password}).then(
    handleUserResponse,
  );
}

function login(user, password) {
  return client('auth/login', {email: user, password: password}).then(
    handleUserResponse,
  );
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

function client(endPoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  };

  return window.fetch(`${authURI}/${endPoint}`, config).then(async (res) => {
    console.log(res);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export {register, login, logout, getToken};
