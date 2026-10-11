import SectionHead from "@/components/SectionHead";

const services = [
  { title: "Particuliers", text: "Vous devez vous relocaliser temporairement ?", img: "/images/tip-1.jpg" },
  { title: "Entreprises", text: "Vous souhaitez loger vos employés ?", img: "/images/tip-2.jpg" },
  { title: "Sinistrés / Assureurs", text: "Vous êtes victime d'un sinistre et vous ne pouvez plus habiter dans votre résidence ?", img: "/images/tip-3.jpg" },
];

export default function Services() {
  return (
    <section id="services" className="glow bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <SectionHead eyebrow="Nos services" title="La solution d'hébergement pour vous." />
        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-5 min-[801px]:grid-cols-3">
          {services.map((s, i) => (
            <a key={s.title} href="#contact" className="card group flex flex-col overflow-hidden !p-0" data-reveal data-delay={0.1 * i}>
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[0.62rem] uppercase tracking-[0.25em] text-primary">{s.title}</p>
                <p className="mt-3 flex-1 font-serif text-[1.25rem] leading-snug">{s.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-foreground/70 group-hover:text-primary">
                  En savoir plus <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
