import { useState, useEffect } from "react";

export function useNow(interval, enabled) {
    const [now, setNow] = useState();
  
    useEffect(() => {
      if (!enabled) {
        setNow(undefined);
        return 
      }
      const intervalId = setInterval(() => {
        setNow(Date.now());
      }, interval);
      return () => clearInterval(intervalId);
    }, [interval, enabled]);
    return now;
  }

export function useInterval(interval, enabled, callback) {
  useEffect(() => {
    if (!enabled) {
      return 
    }
    const intervalId = setInterval(() => {
      callback(Date.now());
    }, interval);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, enabled]);
  return now;
}