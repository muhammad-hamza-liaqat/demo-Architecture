const steps = [
  {
    n: "01",
    title: "Site Analysis",
    text: "Before a line is drawn, we study the plot: how light travels across it through the day, the lie of the terrain, and the orientation that will shape every room.",
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
    ),
  },
  {
    n: "02",
    title: "Concept to Blueprint",
    text: "We translate your vision into structural plans — proportion, volume, and circulation resolved on paper so the build honours the idea.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" /></svg>
    ),
  },
  {
    n: "03",
    title: "Interior Cohesion",
    text: "Interiors are planned alongside the architecture, not after it, so materials, joinery, and furniture belong to the building from day one.",
    icon: (
      <svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="7" rx="2" /><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M7 17v2M17 17v2" /></svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="section section--dark">
      <div className="container">
        <p className="eyebrow" data-reveal>How we work</p>
        <h2 className="h2" data-reveal data-delay="0.08">Our Process</h2>
        <div className="process">
          {steps.map((s, i) => (
            <article key={s.n} className="process__item" data-reveal data-delay={0.1 * i}>
              <div className="process__icon">{s.icon}</div>
              <span className="process__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
