"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useActiveSection } from "@/components/providers/ActiveSectionProvider";
import { navItems, siteConfig } from "@/data/navigation";
import { NavLink } from "@/components/navbar/NavLink";
import { MobileMenu } from "@/components/navbar/MobileMenu";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, isHeroVisible } = useActiveSection();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isHeroVisible ? "bg-transparent" : "bg-background"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="font-heading font-bold text-xl text-foreground"
          >
            {siteConfig.name}
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.sectionId}
                item={item}
                isActive={activeSection === item.sectionId}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="cta" href={siteConfig.ctaHref}>
              {siteConfig.ctaText}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-foreground"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
}
