import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--sans" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--mono" });

export const metadata = {
  title: "Kele Dominik – Full-stack szoftverfejlesztő",
  description: "Full-stack szoftverfejlesztő portfólió: projektek, skillek, referenciák.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
