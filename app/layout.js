import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "demo.com — Architecture et design d'intérieur",
  description: "Studio d'architecture et de design d'intérieur. Là où la vision rencontre l'architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
