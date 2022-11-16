import { useCallback, useEffect, useRef } from 'react';

const useIntervalAsync = (fn: () => Promise<unknown>, ms: number) => {
  const timeout = useRef<number>();
  const mountedRef = useRef(false);
  const run = useCallback(async () => {
    await fn();
    if (mountedRef.current) {
      timeout.current = window.setTimeout(run, ms);
    }
  }, [fn, ms]);
  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => {
      mountedRef.current = false;
      window.clearTimeout(timeout.current);
    };
  }, [run]);
};

export default useIntervalAsync;
