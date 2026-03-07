import type { Metadata } from "next";
import { syne, dmSans } from "@/lib/fonts";
import { ActiveSectionProvider } from "@/components/providers/ActiveSectionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Rivera | Cinematic Videographer",
  description:
    "Cinematic videography portfolio showcasing brand films, commercials, and social content by Alex Rivera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-background text-body font-body antialiased">
        <ActiveSectionProvider>
          {children}
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
