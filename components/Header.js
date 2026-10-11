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
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 min-[801px]:px-6 min-[801px]:pt-5">
        <div
          className={cn(
            "flex w-[min(1120px,100%)] items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-xl transition-all duration-500 min-[801px]:pl-7 min-[801px]:pr-2.5",
            scrolled || open
              ? "border-white/15 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              : "border-white/10 bg-black/35"
          )}
        >
          <a href="#top" onClick={close} className="font-serif text-[1.2rem] tracking-[0.02em]">demo.com</a>

          <nav className="flex gap-[clamp(1rem,2.4vw,2.2rem)] max-[800px]:hidden" aria-label="Navigation principale">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/85 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-foreground max-[800px]:hidden"
          >
            Démarrer un projet
          </a>

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
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-background/95 px-[clamp(1.2rem,5vw,4rem)] backdrop-blur-[18px] transition-opacity duration-300 min-[801px]:hidden",
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
