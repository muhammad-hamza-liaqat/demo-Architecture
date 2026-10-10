const projects = [
  {
    title: "The Meridian Residence",
    text: "A cantilevered glass and concrete home designed around natural light and open sightlines.",
    img: "/images/project-1.jpg",
  },
  {
    title: "Hollow Court Villa",
    text: "A courtyard-centered layout that brings the outdoors into every room.",
    img: "/images/project-2.jpg",
  },
  {
    title: "Birchwood Loft",
    text: "An interior renovation balancing warm wood tones with minimalist steel detailing.",
    img: "/images/project-3.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section section--dark">
      <div className="container">
        <p className="eyebrow" data-reveal>Selected work</p>
        <h2 className="h2" data-reveal data-delay="0.08">Featured Projects</h2>
        <div className="projects">
          {projects.map((p, i) => (
            <article key={p.title} className="project" data-reveal data-delay={0.1 * i}>
              <div className="project__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
