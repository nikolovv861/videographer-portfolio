"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { NavItem } from "@/lib/types";
import { NavLink } from "@/components/navbar/NavLink";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  activeSection,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background transition-all duration-500 ${
        isOpen
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute top-0 right-0 p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="text-foreground transition-colors duration-300 hover:text-gold"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center min-h-screen gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.sectionId}
            item={item}
            isActive={activeSection === item.sectionId}
            onClick={onClose}
            className="text-2xl md:text-3xl"
          />
        ))}
        <Button variant="cta" href={siteConfig.ctaHref} className="mt-4">
          {siteConfig.ctaText}
        </Button>
      </nav>
    </div>
  );
}
