import type { Metadata } from "next";
import { syne, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Rivera | Cinematic Storytelling",
  description:
    "Videographer and director specializing in cinematic brand films, commercials, and social content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
