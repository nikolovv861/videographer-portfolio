"use client";

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          width?: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          overlay?: boolean;
          emoji?: { text: string; animation?: string };
          autoClose?: number;
          showOnce?: boolean;
          doNotShowAfterSubmit?: boolean;
          onOpen?: () => void;
          onClose?: () => void;
          onSubmit?: (payload: unknown) => void;
        }
      ) => void;
      loadEmbeds?: () => void;
    };
  }
}

let scriptLoading: Promise<void> | null = null;

function ensureTallyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Tally) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

  return scriptLoading;
}

export async function openTallyPopup(formId: string) {
  await ensureTallyScript();
  window.Tally?.openPopup(formId, {
    layout: "modal",
    width: 700,
    overlay: true,
    hideTitle: true,
  });
}
