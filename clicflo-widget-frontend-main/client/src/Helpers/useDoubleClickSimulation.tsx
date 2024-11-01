import { useState, useRef, useEffect } from "react";

const useDoubleClickSimulation = (callback, delay = 2) => {
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (clickCount === 1) {
      timerRef.current = setTimeout(() => setClickCount(0), delay);
    } else if (clickCount === 2) {
      callback();
      clearTimeout(timerRef.current);
      setClickCount(0);
    }

    return () => clearTimeout(timerRef.current);
  }, [clickCount, callback, delay]);

  return () => setClickCount((prev) => prev + 1);
};

export default useDoubleClickSimulation;
