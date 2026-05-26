import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const cursive = localFont({
  src: "./fonts/Miama-Regular.ttf",
  variable: "--font-cursive",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Ринат & Динара | Свадьба 28.06.2026",
  description: "Приглашение на свадьбу Рината и Динары. 28 июня 2026 года в 16:00.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${cursive.variable}`}>
      <body>{children}</body>
    </html>
  );
}

