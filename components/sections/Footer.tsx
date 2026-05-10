"use client";

import Image from "next/image";
import { Instagram, Linkedin, Music2 } from "lucide-react";
import { siteConfig } from "@/data/navigation";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer id="footer" className="border-t border-foreground/10 mt-12 py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/[0.04] ring-1 ring-foreground/10">
                <Image
                  src="/images/logos/nnmedia_logo_trim.png"
                  alt="Viper Media"
                  width={48}
                  height={48}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="font-heading text-base font-semibold text-heading">
                  {t("nav.viperMedia")}
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gold">
                  {t("footer.eyebrow")}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm text-body">
              {t("footer.pitch")}
            </p>
          </div>

          {/* Contact + socials */}
          <div className="md:col-span-5">
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.3em] text-body/70">
              {t("footer.contact")}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 block text-sm text-heading transition-colors duration-300 hover:text-gold"
            >
              {siteConfig.email}
            </a>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04] text-body ring-1 ring-foreground/10 transition-colors duration-300 hover:text-gold hover:ring-gold/30"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04] text-body ring-1 ring-foreground/10 transition-colors duration-300 hover:text-gold hover:ring-gold/30"
                aria-label="TikTok"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04] text-body ring-1 ring-foreground/10 transition-colors duration-300 hover:text-gold hover:ring-gold/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-body/70 md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} {t("nav.viperMedia")}.{" "}
            {t("footer.legal.rights")}
          </p>
          <p className="text-body/60">
            {t("footer.legal.companyInfo")} &middot; {t("footer.legal.location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
