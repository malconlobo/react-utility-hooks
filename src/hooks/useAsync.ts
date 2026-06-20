import { useState, useCallback, useEffect } from 'react';

type AsyncState<T> = {
  status: 'idle' | 'pending' | 'success' | 'error';
  value: T | null;
  error: Error | null;
};

/**
 * Handles asynchronous operations (promises) providing state.
 *
 * @param asyncFunction The async function to execute.
 * @param immediate Whether to execute the function immediately.
 * @returns The state and execute function.
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    value: null,
    error: null,
  });

  const execute = useCallback(() => {
    setState({ status: 'pending', value: null, error: null });

    return asyncFunction()
      .then((response) => {
        setState({ status: 'success', value: response, error: null });
        return response;
      })
      .catch((error) => {
        setState({ status: 'error', value: null, error });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
