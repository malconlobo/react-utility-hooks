import { useEffect, useRef, useCallback } from 'react';

/**
 * Uses useIntersectionObserver to trigger a callback when the user scrolls near the bottom of a container.
 *
 * @param callback The callback to execute when intersecting.
 * @param options Intersection options.
 * @returns A ref to attach to the target element.
 */
export function useInfiniteScroll<T extends HTMLElement>(
  callback: () => void,
  options: IntersectionObserverInit = { rootMargin: '100px' }
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<T | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, options.root, options.rootMargin, options.threshold]);

  return targetRef;
}
