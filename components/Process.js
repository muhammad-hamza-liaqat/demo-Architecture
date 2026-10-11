const steps = [
  {
    n: "01",
    title: "Analyse du site",
    text: "Avant de tracer la moindre ligne, nous étudions le terrain : le parcours de la lumière au fil de la journée, la topographie et l'orientation qui façonneront chaque pièce.",
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
    ),
  },
  {
    n: "02",
    title: "Du concept aux plans",
    text: "Nous traduisons votre vision en plans techniques — proportions, volumes et circulation résolus sur papier pour que la construction respecte l'idée.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" /></svg>
    ),
  },
  {
    n: "03",
    title: "Cohérence intérieure",
    text: "Les intérieurs sont pensés en même temps que l'architecture, pas après, pour que matériaux, menuiseries et mobilier appartiennent au bâtiment dès le premier jour.",
    icon: (
      <svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="7" rx="2" /><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M7 17v2M17 17v2" /></svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-background-2 py-[clamp(5rem,14vh,9rem)] glow">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <p className="eyebrow" data-reveal>Notre méthode</p>
        <h2 className="h2" data-reveal data-delay="0.08">Notre processus</h2>
        <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-[clamp(1.5rem,4vw,3.5rem)] min-[801px]:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.n} className="card relative" data-reveal data-delay={0.1 * i}>
              <div className="mb-[1.4rem] grid size-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 [&_svg]:size-[1.1rem] [&_svg]:fill-none [&_svg]:stroke-primary [&_svg]:stroke-[1.4] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
                {s.icon}
              </div>
              <span className="absolute right-7 top-7 font-serif text-2xl text-foreground/15 text-muted-foreground">{s.n}</span>
              <h3 className="mb-[0.7rem] font-serif text-xl font-normal">{s.title}</h3>
              <p className="text-[0.85rem] text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
