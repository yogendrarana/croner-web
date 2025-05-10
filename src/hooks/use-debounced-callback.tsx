import { useCallback, useEffect, useRef } from 'react';
import useCallbackRef from '@/hooks/use-callback-ref';

/**
 * useDebouncedCallback – Debounces a callback while avoiding stale closures
 */

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(callback: T, delay: number) {
  const savedCallback = useCallbackRef(callback);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const setValue = useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => savedCallback(...args), delay);
    },
    [savedCallback, delay],
  );

  return setValue;
}
