import type { Metadata } from "next";
import { syne, dmSans, manrope } from "@/lib/fonts";
import { ActiveSectionProvider } from "@/components/providers/ActiveSectionProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vipermedia — Unleash Your Story, Amplify Your Reach",
  description:
    "Vipermedia specializes in content creation and visual storytelling — professional photography, product videos and short-form social content that elevates your brand.",
  keywords: [
    "vipermedia",
    "content creation",
    "social media content",
    "product video",
    "professional photography",
    "short form video",
    "visual storytelling",
  ],
  authors: [{ name: "Vipermedia" }],
  openGraph: {
    title: "Vipermedia — Unleash Your Story, Amplify Your Reach",
    description:
      "Content creation and visual storytelling that magnifies your brand's digital presence.",
    url: "https://vipermedia.co",
    siteName: "Vipermedia",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vipermedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipermedia — Unleash Your Story, Amplify Your Reach",
    description:
      "Content creation and visual storytelling that magnifies your brand's digital presence.",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${manrope.variable}`}>
      <body className="bg-background text-body font-body antialiased">
        <ScrollProgressBar />
        <ActiveSectionProvider>
          <Navbar />
          {children}
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
