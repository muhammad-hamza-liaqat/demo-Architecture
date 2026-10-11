import { cn } from "@/lib/utils";

const tips = [
  {
    n: "Conseil 01",
    title: "Laissez la lumière naturelle guider",
    text: "Orientez les pièces selon la lumière du jour plutôt que de l'ajouter après coup. Placez les espaces les plus utilisés là où le soleil passe le plus de temps, et laissez les ouvertures cadrer la lumière changeante.",
    img: "/images/tip-1.jpg",
  },
  {
    n: "Conseil 02",
    title: "Optez pour une palette sobre",
    text: "Restez dans les tons neutres et ajoutez un matériau d'accent — chêne, travertin ou laiton brossé. La retenue laisse la texture et les proportions s'exprimer.",
    img: "/images/tip-2.jpg",
  },
  {
    n: "Conseil 03",
    title: "La fluidité avant la symétrie",
    text: "Concevez selon la façon dont on se déplace dans un espace, pas pour un plan parfaitement symétrique. Des parcours clairs et des perspectives réfléchies comptent bien plus qu'un équilibre forcé.",
    img: "/images/tip-3.jpg",
  },
];

export default function Tips() {
  return (
    <section id="tips" className="bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Inspiration</p>
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal data-delay="0.08">Conseils de design d'intérieur</h2>
        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-[clamp(3rem,9vw,6rem)]">
          {tips.map((t, i) => (
            <article
              key={t.n}
              className="grid grid-cols-1 items-center gap-[clamp(1.5rem,5vw,4.5rem)] min-[801px]:grid-cols-[1.15fr_1fr]"
            >
              <div className={cn("group overflow-hidden rounded-xs", i % 2 && "min-[801px]:order-2")} data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-[1.04]"
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                />
              </div>
              <div data-reveal data-delay="0.12">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">{t.n}</span>
                <h3 className="mb-[0.9rem] mt-[0.7rem] font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] font-normal">{t.title}</h3>
                <p className="max-w-[26rem] text-[0.9rem] text-muted-foreground">{t.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
