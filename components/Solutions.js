import SectionHead from "@/components/SectionHead";

const items = [
  { title: "Logements Temporaires", text: "Vous avez besoin d'un logement meublé temporaire ?", img: "/images/project-1.jpg" },
  { title: "Nomades", text: "Vous devez vous relocaliser dans un secteur éloigné et vous manquez d'options ?", img: "/images/project-2.jpg" },
  { title: "Projets spéciaux", text: "Vous êtes à court de solution pour votre relocalisation ?", img: "/images/project-3.jpg" },
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-background-2 py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <SectionHead eyebrow="Solutions" title="Une offre de relocalisation adaptée à chaque situation" />
        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-5 min-[801px]:grid-cols-3">
          {items.map((s, i) => (
            <a key={s.title} href="#contact" className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl border border-border p-7" data-reveal data-delay={0.1 * i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/35 to-black/5" />
              <h3 className="font-serif text-[1.7rem] leading-tight">{s.title}</h3>
              <p className="mt-2 max-w-xs text-[0.85rem] text-foreground/80">{s.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                En savoir plus <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
