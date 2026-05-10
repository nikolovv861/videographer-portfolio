"use client";

import { useLang } from "@/lib/i18n";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const [lang, setLang] = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.03] p-0.5 font-heading text-[0.65rem] font-bold uppercase tracking-[0.2em] ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-3 py-1 transition-colors ${
          lang === "en"
            ? "bg-[#9eed1e] text-background"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("bg")}
        aria-pressed={lang === "bg"}
        className={`rounded-full px-3 py-1 transition-colors ${
          lang === "bg"
            ? "bg-[#9eed1e] text-background"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        BG
      </button>
    </div>
  );
}
