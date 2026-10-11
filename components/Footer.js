const icon = "size-[1.05rem] fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]";

const nav = [
  { href: "#process", label: "Processus" },
  { href: "#tips", label: "Conseils" },
  { href: "#projects", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

// Placeholder links — point these at the studio's real profiles / contact details.
const items = [
  { label: "Instagram", href: "#", svg: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" /></> },
  { label: "LinkedIn", href: "#", svg: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5m0 2.5c0-1.5 1-2.5 2.3-2.5S16.5 12 16.5 13.5V16" /></> },
  { label: "Facebook", href: "#", svg: <path d="M14 21v-7h2.5l.5-3H14V9.5C14 8.6 14.4 8 15.6 8H17V5.2C16.6 5.1 15.7 5 14.8 5 12.6 5 11 6.3 11 8.8V11H8.5v3H11v7" /> },
  { label: "Courriel", href: "mailto:contact@demo.com", svg: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4 8 8 5.5L20 8" /></> },
  { label: "Téléphone", href: "tel:+10000000000", svg: <path d="M6.5 4h3l1.5 4-2 1.2a11 11 0 0 0 5.8 5.8L16 13l4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 6a2 2 0 0 1 2-2" /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-2">
      <div className="mx-auto flex w-[min(1120px,100%-2.4rem)] flex-col items-center justify-between gap-4 py-5 min-[1001px]:flex-row">
        <a href="#top" className="font-serif text-[1.1rem]">demo.com</a>

        <nav aria-label="Pied de page" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-[0.68rem] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {items.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className={icon} aria-hidden="true">{s.svg}</svg>
            </a>
          ))}
        </div>
      </div>
      <p className="border-t border-border py-3 text-center text-[0.65rem] tracking-[0.08em] text-muted-foreground">© {new Date().getFullYear()} demo.com</p>
    </footer>
  );
}
