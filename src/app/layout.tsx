import type { Metadata } from "next";

import "./globals.css";
import { clashDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "Relynk",
  description: "Create. Share. Get Paid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashDisplay.variable} antialiased`}>{children}</body>
    </html>
  );
}
