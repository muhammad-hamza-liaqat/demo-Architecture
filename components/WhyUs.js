const reasons = [
  { title: "Approche personnalisée", text: "Nous analysons d'abord vos besoins, votre terrain et votre budget avant de proposer quoi que ce soit." },
  { title: "Solutions clé en main", text: "Conception, permis, matériaux et coordination : un seul interlocuteur, du premier croquis à la livraison." },
  { title: "Un large éventail de projets", text: "De la rénovation d'un appartement à la maison complète, nous adaptons notre méthode à chaque échelle." },
];

const features = [
  "Conception architecturale et intérieure intégrée",
  "Matériaux et mobilier haut de gamme",
  "Plans 3D pour visualiser avant de construire",
  "Délais clairs et flexibles",
  "Suivi de chantier et service après livraison",
  "Aucun engagement avant l'étude préliminaire",
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-background-2 py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Pourquoi nous</p>
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal data-delay="0.08">Pourquoi choisir demo.com</h2>

        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] min-[801px]:grid-cols-3">
          {reasons.map((r, i) => (
            <article key={r.title} data-reveal data-delay={0.1 * i}>
              <span className="text-[0.65rem] tracking-[0.2em] text-primary">0{i + 1}</span>
              <h3 className="mb-[0.6rem] mt-2 font-serif text-xl font-normal">{r.title}</h3>
              <p className="text-[0.85rem] text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>

        <ul className="mt-[clamp(3rem,7vw,5rem)] grid grid-cols-1 gap-x-12 border-t border-border pt-8 min-[801px]:grid-cols-2" data-reveal>
          {features.map((f) => (
            <li key={f} className="flex items-center gap-4 border-b border-border py-4 text-[0.85rem] text-foreground/85">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-none stroke-primary stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
