"use client";

import { useEffect, useRef } from "react";

export function useScrollLock(isLocked: boolean): void {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      scrollYRef.current = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      const savedScrollY = scrollYRef.current;

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, savedScrollY);
    }

    return () => {
      const savedScrollY = scrollYRef.current;

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (isLocked) {
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [isLocked]);
}
