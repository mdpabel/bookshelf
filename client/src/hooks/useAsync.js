const {useReducer, useRef, useCallback, useEffect} = require('react');

function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  });

  return useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

const defaultInitialState = {
  status: 'idle',
  data: null,
  error: null,
};

function useAsync(initialState) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{status, data, error}, setState] = useReducer(
    (s, a) => ({...s, ...a}),
    initialStateRef.current,
  );

  const setSafeState = useSafeDispatch(setState);

  const setData = useCallback(
    (data) => {
      setSafeState({data: data, status: 'resolved'});
    },
    [setSafeState],
  );

  const setError = useCallback(
    (error) => {
      setSafeState({error: error, status: 'rejected'});
    },
    [setSafeState],
  );

  const reset = useCallback(() => {
    setSafeState(initialStateRef.current);
  }, [setSafeState]);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise.`,
        );
      }

      setSafeState({status: 'pending'});

      promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        },
      );
    },
    [setData, setError, setSafeState],
  );

  return {
    isLoading: status === 'pending',
    isSuccess: status === 'resolved',
    isError: status === 'rejected',
    isIdle: status === 'idle',
    data,
    error,
    reset,
    setData,
    setError,
    run,
  };
}

export {useAsync};
