import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--playfair-font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--script-font",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--handwritten-font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation Builder",
  description: "Create your beautiful wedding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${greatVibes.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
