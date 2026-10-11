const projects = [
  {
    title: "La Résidence Méridien",
    text: "Une maison en porte-à-faux de verre et de béton, conçue autour de la lumière naturelle et de larges perspectives.",
    img: "/images/project-1.jpg",
  },
  {
    title: "Villa Cour Creuse",
    text: "Un plan organisé autour d'une cour qui fait entrer l'extérieur dans chaque pièce.",
    img: "/images/project-2.jpg",
  },
  {
    title: "Loft Birchwood",
    text: "Une rénovation intérieure alliant bois chaleureux et détails d'acier minimalistes.",
    img: "/images/project-3.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-background-2 py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Réalisations</p>
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal data-delay="0.08">Projets à l'honneur</h2>
        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-[clamp(1rem,2.5vw,2rem)] min-[801px]:grid-cols-3">
          {projects.map((p, i) => (
            <article key={p.title} className="group" data-reveal data-delay={0.1 * i}>
              <div className="mb-[1.1rem] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-[1.06]"
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                />
              </div>
              <h3 className="mb-[0.4rem] font-serif text-[1.1rem] font-normal">{p.title}</h3>
              <p className="text-[0.8rem] text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
