import { useRef, useEffect } from 'react';

/**
 * Stores the previous state or prop value.
 *
 * @param value The value to track.
 * @returns The previous value.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
