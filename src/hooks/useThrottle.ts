import { useState, useEffect, useRef } from 'react';

/**
 * Returns a throttled version of the value that only updates at most once every `delay` milliseconds.
 *
 * @param value The value to throttle.
 * @param delay The throttle limit in milliseconds.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const timeSinceLastExecution = Date.now() - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    } else {
      const timerId = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - timeSinceLastExecution);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}
