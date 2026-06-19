import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eyeconic | Football Emotion Engine",
  description: "Eyeconic analyzes live fan sentiment, emotional momentum, and match events to show you the games that matter most right now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground bg-dark overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
