import { useState, useEffect } from "react";

function useWindowWidthEventListener(width) {

  const [isColumnView, setIsColumnView] = useState(false);

  function windowInColumnView() {
    window.innerWidth < width ? setIsColumnView(true) : setIsColumnView(false);
  }

  useEffect(() => {
    windowInColumnView();
    window.addEventListener("resize", windowInColumnView);
    return () => window.removeEventListener("resize", windowInColumnView);
  }, []);

  return isColumnView;

}


export default useWindowWidthEventListener;