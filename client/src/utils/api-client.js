import * as authProvider from '../auth-provider';

function client(
  endPoint,
  {data, token, headers: customHeaders, method, ...customConfig} = {},
) {
  const config = {
    method: method ? method : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, config)
    .then(async (res) => {
      if (res.status === 401) {
        authProvider.logout();
        window.location.assign(window.location);
        Promise.reject('Please re-authenticate!');
      }

      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export {client};
