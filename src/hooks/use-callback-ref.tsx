import { useRef, useEffect, useMemo } from 'react';

/**
 * useCallbackRef – Always uses the latest callback without breaking references
 */

export default function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
