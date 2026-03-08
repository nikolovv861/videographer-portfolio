import type { Metadata } from "next";
import { syne, dmSans } from "@/lib/fonts";
import { ActiveSectionProvider } from "@/components/providers/ActiveSectionProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { CustomCursor } from "@/components/effects/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Rivera | Cinematic Videographer",
  description:
    "Cinematic videography portfolio showcasing brand films, commercials, and social content by Alex Rivera.",
  keywords: [
    "videographer",
    "cinematographer",
    "brand films",
    "commercial video",
    "portfolio",
    "cinematic storytelling",
  ],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera | Cinematic Videographer",
    description:
      "Cinematic videography portfolio showcasing brand films, commercials, and social content.",
    url: "https://alexrivera.com",
    siteName: "Alex Rivera",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Rivera Videography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera | Cinematic Videographer",
    description:
      "Cinematic videography portfolio showcasing brand films, commercials, and social content.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
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
          <Navbar />
          {children}
        </ActiveSectionProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
