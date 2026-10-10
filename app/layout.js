import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "demo.com — Architecture & Interior Design",
  description: "Architecture and interior design studio. Where vision meets architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
