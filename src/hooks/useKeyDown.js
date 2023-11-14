import { useEffect } from "react";

function useKeyDown(key, callback) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === key) {
        callback();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, callback]);
}

export default useKeyDown;
