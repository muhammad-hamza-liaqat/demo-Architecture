const faqs = [
  { q: "Combien de temps dure un projet d'architecture ?", a: "Cela dépend de l'ampleur : comptez quelques semaines pour une étude préliminaire, puis de 3 à 6 mois pour les plans et permis d'une maison. Nous vous donnons un calendrier précis dès la première rencontre." },
  { q: "Intervenez-vous seulement sur les nouvelles constructions ?", a: "Non. Nous travaillons aussi bien sur des constructions neuves que sur des rénovations, agrandissements et réaménagements intérieurs." },
  { q: "Pouvez-vous gérer le design d'intérieur et l'architecture ensemble ?", a: "Oui, c'est notre approche : les intérieurs sont conçus en même temps que le bâtiment, pour une cohérence totale des matériaux, du mobilier et des volumes." },
  { q: "Comment le budget est-il établi ?", a: "Après l'analyse de vos besoins et du terrain, nous proposons une estimation par phase. Aucune dépense n'est engagée sans votre accord." },
  { q: "Travaillez-vous avec des entrepreneurs de mon choix ?", a: "Bien sûr. Nous pouvons coordonner vos entrepreneurs ou vous recommander des partenaires de confiance." },
  { q: "Comment démarrer ?", a: "Remplissez le formulaire de contact ci-dessous : nous vous recontactons pour une première discussion, sans engagement." },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-background-2 py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(760px,100%-2.4rem)]">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Questions fréquentes</p>
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal data-delay="0.08">FAQ</h2>
        <div className="mt-[clamp(2rem,5vw,3.5rem)] border-t border-border" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-[1.05rem] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="relative size-3 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-primary" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-primary transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-6 pr-8 text-[0.85rem] text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
