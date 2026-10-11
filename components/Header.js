"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#process", label: "Processus" },
  { href: "#tips", label: "Conseils" },
  { href: "#projects", label: "Projets" },
  { href: "#services", label: "Services"},
  { href: "#faq", label: "FAQ"},
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the phone menu is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Leaving phone width with the menu open would leave the page scroll-locked.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 801px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => {
    document.body.style.overflow = ""; // release before the anchor jump happens
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1.2rem,5vw,4rem)] py-[1.4rem] transition-all duration-400",
          // The logo/links sit over bright footage, so give them a scrim until the bar fills in.
          !scrolled && !open && "bg-linear-to-b from-black/75 via-black/40 to-transparent max-[800px]:from-black/55 max-[800px]:via-transparent",
          scrolled && "border-b border-border bg-background/85 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-[14px]",
          open && "max-[800px]:bg-transparent max-[800px]:backdrop-blur-none"
        )}
      >
        <a href="#top" onClick={close} className="font-serif text-[1.25rem] tracking-[0.02em] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">demo.com</a>

        <nav className="flex gap-[clamp(1rem,3vw,2.5rem)] max-[800px]:hidden" aria-label="Navigation principale">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-foreground [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center min-[801px]:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-[0.8rem] w-6">
            <span className={cn("absolute left-0 h-px w-full bg-foreground transition-all duration-300", open ? "top-1/2 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 h-px w-full bg-foreground transition-all duration-300", open ? "top-1/2 -rotate-45" : "bottom-0")} />
          </span>
        </button>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center gap-7 bg-background/95 px-[clamp(1.2rem,5vw,4rem)] backdrop-blur-[18px] transition-opacity duration-300 min-[801px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            className={cn(
              "font-serif text-[2.2rem] leading-none transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
