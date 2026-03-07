"use client";

import { useEffect, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSection } from "@/components/providers/ActiveSectionProvider";

interface SectionObserverProps {
  sectionId: string;
  children: ReactNode;
  className?: string;
}

export function SectionObserver({
  sectionId,
  children,
  className,
}: SectionObserverProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-80px 0px -50% 0px",
  });
  const { setActiveSection, setIsHeroVisible } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionId);
    }
  }, [inView, sectionId, setActiveSection]);

  useEffect(() => {
    if (sectionId === "hero") {
      setIsHeroVisible(inView);
    }
  }, [inView, sectionId, setIsHeroVisible]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
