"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
  isHeroVisible: boolean;
  setIsHeroVisible: (visible: boolean) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, setActiveSection, isHeroVisible, setIsHeroVisible }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within an ActiveSectionProvider"
    );
  }
  return context;
}
