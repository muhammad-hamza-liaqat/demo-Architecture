import SectionHead from "@/components/SectionHead";

// Placeholder articles — the original shows 11 image-only "Lire" links with no visible titles.
const posts = [
  { title: "Location meublée de 31 jours et plus : à quoi s'attendre", tag: "Guide", img: "/images/tip-1.jpg" },
  { title: "Se relocaliser après un sinistre : les premières étapes", tag: "Sinistres", img: "/images/tip-2.jpg" },
  { title: "Loger vos employés en mutation : le guide", tag: "Entreprises", img: "/images/tip-3.jpg" },
  { title: "Bien choisir son secteur pour une location temporaire", tag: "Conseils", img: "/images/project-1.jpg" },
  { title: "Condo ou maison : quelle unité choisir ?", tag: "Guide", img: "/images/project-2.jpg" },
  { title: "Nomades : se loger en région éloignée", tag: "Nomades", img: "/images/project-3.jpg" },
];

function Card({ post, hidden }) {
  return (
    <a
      href="#blogue"
      tabIndex={hidden ? -1 : undefined}
      className="group relative isolate flex h-[27rem] w-[min(20rem,78vw)] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-border p-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.img} alt="" loading="lazy" draggable={false} className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/40 to-black/5" />
      <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary backdrop-blur-md">{post.tag}</span>
      <h3 className="font-serif text-[1.3rem] font-normal leading-snug text-balance">{post.title}</h3>
      <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-primary">
        Lire <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </span>
    </a>
  );
}

// Repeat the list inside each group so a group is always wider than even an ultra-wide screen.
const loop = [...posts, ...posts];

export default function Blog() {
  return (
    <section id="blogue" className="bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <SectionHead eyebrow="Blogue" title="Nos derniers articles" text="Conseils, guides et actualités pour réussir votre relocalisation." />
      </div>

      <div
        className="marquee mt-[clamp(2.5rem,6vw,4rem)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        style={{ "--marquee-duration": `${loop.length * 5.5}s` }}
      >
        <div className="marquee-track flex w-max">
          {/* Each group carries its own trailing padding so both are exactly the same width. */}
          <div className="flex gap-5 pr-5">
            {loop.map((p, i) => <Card key={i} post={p} />)}
          </div>
          <div className="marquee-dup flex gap-5 pr-5" aria-hidden="true">
            {loop.map((p, i) => <Card key={i} post={p} hidden />)}
          </div>
        </div>
      </div>
    </section>
  );
}
