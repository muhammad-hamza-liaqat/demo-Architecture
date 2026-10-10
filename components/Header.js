"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#process", label: "Process" },
  { href: "#tips", label: "Design Tips" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1.2rem,5vw,4rem)] py-[1.4rem] transition-all duration-400",
        scrolled && "bg-background/55 py-4 backdrop-blur-[14px]"
      )}
    >
      <a href="#top" className="font-serif text-[1.15rem] tracking-[0.02em]">demo.com</a>
      <nav className="flex gap-[clamp(1rem,3vw,2.5rem)]">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={cn(
              "text-[0.68rem] uppercase tracking-[0.22em] text-foreground/75 transition-colors hover:text-foreground",
              i === 1 && "max-[800px]:hidden"
            )}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
