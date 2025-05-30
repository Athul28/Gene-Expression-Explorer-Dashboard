import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gene-explorer",
  description: "Gene explorer to predict diseases",
  generator: "Wall breakers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
