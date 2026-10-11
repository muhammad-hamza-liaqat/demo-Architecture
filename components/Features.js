import SectionHead from "@/components/SectionHead";

const p = "fill-none stroke-primary stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round]";
const features = [
  { title: "Location Flexible: 31 Jours et Plus", text: "Louez à partir de 31 jours, avec prolongation possible au jour, à la semaine ou au mois, à tarif mensuel avantageux.", icon: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></> },
  { title: "Qualités Supérieures des Locations", text: "Des unités modernes, entièrement meublées, avec électroménagers et literie inclus.", icon: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" /> },
  { title: "Prise de Possession Simplifiée et Rapide", text: "Emménagez à la date souhaitée, parfois même le jour de votre demande.", icon: <path d="M13 3 5 14h6l-1 7 8-11h-6z" /> },
  { title: "Service Client 24/7", text: "Un service à la clientèle et d'entretien disponible en tout temps.", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { title: "Aucun engagement à long terme", text: "Gardez la liberté de rester le temps qu'il vous faut, sans bail de longue durée.", icon: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 7.5-2" /></> },
  { title: "Équipements de haute qualité", text: "Mobilier et électroménagers haut de gamme pour un confort au quotidien.", icon: <><rect x="4" y="10" width="16" height="7" rx="2" /><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M7 17v2M17 17v2" /></> },
  { title: "Design élégant et moderne", text: "Des intérieurs soignés, pensés pour que vous vous sentiez chez vous dès l'arrivée.", icon: <path d="M4 20V9l8-5 8 5v11zM10 20v-6h4v6" /> },
  { title: "Intimité et confort", text: "Plus d'espace et d'intimité qu'à l'hôtel, dans une ambiance chaleureuse comme à la maison.", icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /> },
];

export default function Features() {
  return (
    <section id="solution" className="bg-background-2 py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <SectionHead
          eyebrow="Notre solution"
          title="Notre solution de location à court terme meublée"
          text="Profitez de notre service clés en main pour aménager dès maintenant en toute simplicité dans votre logement temporaire."
        />
        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1001px]:grid-cols-4">
          {features.map((f, i) => (
            <article key={f.title} className="card" data-reveal data-delay={0.05 * (i % 4)}>
              <div className="mb-5 grid size-12 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                <svg viewBox="0 0 24 24" className={`size-5 ${p}`} aria-hidden="true">{f.icon}</svg>
              </div>
              <h3 className="font-serif text-[1.1rem] font-normal leading-snug">{f.title}</h3>
              <p className="mt-2 text-[0.8rem] text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
