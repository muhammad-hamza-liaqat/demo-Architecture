const services = [
  {
    title: "Particuliers",
    text: "Maison neuve, agrandissement ou rénovation : un accompagnement complet, de l'esquisse à la remise des clés, pour un projet à votre image.",
    points: ["Études de faisabilité", "Plans et permis", "Suivi de chantier"],
  },
  {
    title: "Entreprises",
    text: "Bureaux, commerces et espaces d'accueil pensés pour votre marque et le bien-être de vos équipes, livrés clé en main.",
    points: ["Aménagement d'espaces", "Image de marque", "Coordination des corps de métier"],
  },
  {
    title: "Promoteurs et assureurs",
    text: "Projets multirésidentiels, reconstructions après sinistre : une réponse rapide, rigoureuse et conforme aux exigences réglementaires.",
    points: ["Reconstruction après sinistre", "Projets multilogements", "Livraison dans les délais"],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Pour qui</p>
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal data-delay="0.08">Nos services</h2>
        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] min-[801px]:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.title} className="border-t border-border pt-8" data-reveal data-delay={0.1 * i}>
              <h3 className="mb-[0.8rem] font-serif text-xl font-normal">{s.title}</h3>
              <p className="text-[0.85rem] text-muted-foreground">{s.text}</p>
              <ul className="mt-5 grid gap-2 text-[0.8rem] text-foreground/80">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="size-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
