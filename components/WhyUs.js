import SectionHead from "@/components/SectionHead";

const why = [
  { title: "Une approche personnalisée", text: "Nous analysons d'abord vos besoins afin de vous proposer l'unité qui convient vraiment à votre situation." },
  { title: "Des solutions clés en main", text: "Des solutions prêtes à habiter, souvent disponibles dès le jour de votre demande." },
  { title: "Une vaste sélection d'unités", text: "Du logement une chambre jusqu'à la maison complète, un vaste choix pour chaque besoin." },
];
const quality = [
  { title: "Des logements modernes et confortables", text: "Un mobilier et des électroménagers haut de gamme, dans des unités élégantes et modernes." },
  { title: "Une équipe dévouée à votre service", text: "Un service à la clientèle et d'entretien disponible 24/7 pour répondre à vos besoins." },
  { title: "Une expérience sans souci", text: "Arrivez avec votre valise : tout est prêt, sans engagement à long terme." },
];

function Group({ eyebrow, title, items, alt }) {
  return (
    <div className={alt ? "mt-[clamp(4rem,10vw,7rem)]" : ""}>
      <SectionHead eyebrow={eyebrow} title={title} />
      <div className="mt-[clamp(2rem,5vw,3.5rem)] grid grid-cols-1 gap-5 min-[801px]:grid-cols-3">
        {items.map((r, i) => (
          <article key={r.title} className="card" data-reveal data-delay={0.1 * i}>
            <span className="font-serif text-3xl text-primary/60">0{i + 1}</span>
            <h3 className="mb-2 mt-4 font-serif text-xl font-normal leading-snug">{r.title}</h3>
            <p className="text-[0.85rem] text-muted-foreground">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="pourquoi" className="glow bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <Group eyebrow="Pourquoi nous" title="Pourquoi choisir demo.com pour votre location à court terme meublée?" items={why} />
        <Group alt eyebrow="Qualité" title="La qualité au cœur de notre offre de location de 31 jours et plus" items={quality} />
      </div>
    </section>
  );
}
