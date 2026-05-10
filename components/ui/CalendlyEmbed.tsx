"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

let scriptLoading: Promise<void> | null = null;

function ensureCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<void>((resolve) => {
    // Stylesheet for the popup overlay
    if (
      !document.querySelector(
        'link[href="https://assets.calendly.com/assets/external/widget.css"]'
      )
    ) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return scriptLoading;
}

interface CalendlyInlineProps {
  url: string;
  height?: number;
  className?: string;
}

export function CalendlyEmbed({
  url,
  height = 700,
  className = "",
}: CalendlyInlineProps) {
  useEffect(() => {
    ensureCalendlyAssets();
  }, []);

  return (
    <div
      className={`calendly-inline-widget ${className}`}
      data-url={url}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  );
}

/**
 * Opens the Calendly popup overlay when clicked. Loads the script lazily.
 */
export async function openCalendlyPopup(url: string) {
  await ensureCalendlyAssets();
  window.Calendly?.initPopupWidget({ url });
}
