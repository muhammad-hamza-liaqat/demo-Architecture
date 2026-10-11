const nav = [
  { href: "#process", label: "Processus" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projets" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];
// Placeholder links — point these at the studio's real profiles.
const socials = ["Instagram", "LinkedIn", "Facebook"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-2 py-14">
      <div className="mx-auto grid w-[min(1120px,100%-2.4rem)] gap-10 min-[801px]:grid-cols-3">
        <div>
          <p className="font-serif text-[1.15rem]">demo.com</p>
          <p className="mt-3 max-w-64 text-[0.8rem] text-muted-foreground">Studio d&apos;architecture et de design d&apos;intérieur.</p>
        </div>
        <nav aria-label="Pied de page" className="grid content-start gap-3 text-[0.8rem] text-muted-foreground">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">{n.label}</a>
          ))}
        </nav>
        <div className="grid content-start gap-3 text-[0.8rem] text-muted-foreground">
          <a href="mailto:contact@demo.com" className="transition-colors hover:text-foreground">contact@demo.com</a>
          <a href="tel:+10000000000" className="transition-colors hover:text-foreground">(000) 000-0000</a>
          <div className="mt-2 flex gap-5">
            {socials.map((s) => (
              <a key={s} href="#" className="transition-colors hover:text-foreground">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-[0.7rem] tracking-[0.1em] text-muted-foreground">© {new Date().getFullYear()} demo.com — Tous droits réservés</p>
    </footer>
  );
}
