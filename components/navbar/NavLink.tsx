"use client";

import type { NavItem } from "@/lib/types";

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ item, isActive, onClick, className = "" }: NavLinkProps) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={`font-heading text-sm tracking-wide transition-colors duration-300 ${
        isActive
          ? "text-gold"
          : "text-foreground/60 hover:text-foreground"
      } ${className}`}
    >
      {item.label}
    </a>
  );
}
