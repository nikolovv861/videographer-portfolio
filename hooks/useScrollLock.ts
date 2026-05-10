"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while a modal is open.
 * Uses overflow:hidden + paddingRight (no body-fixed) so closing the modal
 * leaves the user at the exact scroll position they were at when it opened —
 * no jump-to-top, no smooth-scroll re-entry.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isLocked]);
}
