const tips = [
  {
    n: "Tip 01",
    title: "Let Natural Light Lead",
    text: "Orient rooms around daylight rather than adding it afterwards. Place the spaces you use most where the sun spends the most time, and let openings frame the changing light through the day.",
    img: "/images/tip-1.jpg",
  },
  {
    n: "Tip 02",
    title: "Choose a Restrained Palette",
    text: "Keep to neutral tones and introduce one accent material — oak, travertine, or brushed brass. Restraint lets texture and proportion do the talking.",
    img: "/images/tip-2.jpg",
  },
  {
    n: "Tip 03",
    title: "Flow Over Symmetry",
    text: "Design for how people move through a space, not for a perfectly mirrored plan. Clear paths and considered sightlines matter far more than forced balance.",
    img: "/images/tip-3.jpg",
  },
];

export default function Tips() {
  return (
    <section id="tips" className="section">
      <div className="container">
        <p className="eyebrow" data-reveal>Advice</p>
        <h2 className="h2" data-reveal data-delay="0.08">Interior Design Tips</h2>
        <div className="tips">
          {tips.map((t, i) => (
            <article key={t.n} className={`tip ${i % 2 ? "tip--flip" : ""}`}>
              <div className="tip__img" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.img} alt={t.title} loading="lazy" />
              </div>
              <div className="tip__text" data-reveal data-delay="0.12">
                <span className="eyebrow">{t.n}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
