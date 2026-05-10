"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useActiveSection } from "@/components/providers/ActiveSectionProvider";
import { navItems, siteConfig } from "@/data/navigation";
import { NavLink } from "@/components/navbar/NavLink";
import { MobileMenu } from "@/components/navbar/MobileMenu";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection } = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/55 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/[0.06] shadow-[0_2px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between h-24">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex flex-col items-center leading-none"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 ring-1 ring-[#9eed1e]/40 backdrop-blur-sm shadow-[0_0_18px_rgba(158,237,30,0.25)] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logos/nnmedia_logo_trim.png"
                alt="Vipermedia"
                width={64}
                height={64}
                className="h-11 w-11 object-contain"
              />
            </span>
            <span className="mt-1.5 font-heading text-[0.7rem] font-normal tracking-[0.25em] uppercase text-[#9eed1e]/85">
              Viper Media
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex gap-9 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.sectionId}
                item={item}
                isActive={activeSection === item.sectionId}
              />
            ))}
          </nav>

          {/* Desktop CTA — clapperboard */}
          <a
            href={siteConfig.ctaHref}
            aria-label={siteConfig.ctaText}
            className="group hidden flex-col items-center leading-none md:flex"
          >
            <Clapperboard />
            <span className="mt-1.5 font-heading text-[0.7rem] font-normal tracking-[0.25em] uppercase text-[#9eed1e]/85 transition-colors group-hover:text-[#9eed1e]">
              {siteConfig.ctaText}
            </span>
          </a>

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

/* ─────────────────────────────────────────────── */
/* Animated film slate — clapper hinges open on hover */
/* viewBox 64×56 with the hinge at (4, 18)            */
/* ─────────────────────────────────────────────── */
function Clapperboard() {
  return (
    <svg
      viewBox="0 0 64 56"
      width="48"
      height="42"
      fill="none"
      className="block overflow-visible"
      aria-hidden
    >
      {/* Slate body */}
      <g>
        <rect
          x="4"
          y="20"
          width="56"
          height="32"
          rx="2.5"
          fill="#0d0f14"
          stroke="#9eed1e"
          strokeWidth="1.8"
        />
        {/* Take lines */}
        <line x1="10" y1="32" x2="58" y2="32" stroke="#9eed1e" strokeWidth="1.2" opacity="0.45" />
        <line x1="10" y1="40" x2="42" y2="40" stroke="#9eed1e" strokeWidth="1.2" opacity="0.45" />
        <line x1="10" y1="46" x2="50" y2="46" stroke="#9eed1e" strokeWidth="1.2" opacity="0.45" />
      </g>

      {/* Clapper top — hinged at lower-left corner (4, 18). Rotates open on hover. */}
      <g
        className="origin-[4px_18px] transition-transform duration-300 ease-out group-hover:-rotate-[35deg]"
      >
        {/* Black base bar of the clapper */}
        <rect
          x="4"
          y="6"
          width="56"
          height="12"
          rx="1.5"
          fill="#0d0f14"
          stroke="#9eed1e"
          strokeWidth="1.8"
        />
        {/* Diagonal green stripes — alternating fill chunks */}
        <g fill="#9eed1e">
          <polygon points="6,18 14,18  10,6   6,6" />
          <polygon points="22,18 30,18 26,6  18,6" />
          <polygon points="38,18 46,18 42,6  34,6" />
          <polygon points="54,18 58,17.5 58,6.5 50,6" />
        </g>
        {/* Hinge pin (visual cue) */}
        <circle cx="6" cy="18" r="1.3" fill="#9eed1e" />
      </g>
    </svg>
  );
}
