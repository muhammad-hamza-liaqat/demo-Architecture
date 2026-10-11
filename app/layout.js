import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "demo.com — Location temporaire meublée",
  description: "La solution de relocalisation temporaire : location 100 % meublé, durée flexible, prise de possession rapide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
