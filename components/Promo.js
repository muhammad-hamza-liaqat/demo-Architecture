export default function Promo() {
  return (
    <section id="concours" className="bg-background-2 py-[clamp(3rem,8vh,5rem)]">
      <div className="relative mx-auto w-[min(1120px,100%-2.4rem)] overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-br from-primary/15 via-primary/5 to-transparent px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,6vw,4.5rem)]" data-reveal>
        <div className="flex flex-col gap-8 min-[801px]:flex-row min-[801px]:items-center min-[801px]:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Concours</p>
            <h2 className="h2">Gagnez le voyage KONDO</h2>
            <p className="mt-4 text-[0.95rem] text-foreground/80">
              Réservez votre KONDO avant le 19 décembre 2026 et courez la chance de gagner votre voyage d&apos;une semaine pour 2 au Bahamas!
            </p>
          </div>
          <a href="#contact" className="w-fit rounded-full bg-primary px-8 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-foreground">
            Participer
          </a>
        </div>
      </div>
    </section>
  );
}
