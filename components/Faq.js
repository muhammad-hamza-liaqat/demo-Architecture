const faqs = [
  { q: "Quelle est la durée minimale de location ?", a: "Nos locations débutent à 31 jours. Elles sont ensuite prolongeables au jour, à la semaine ou au mois, avec des tarifs mensuels avantageux." },
  { q: "Les unités sont-elles meublées ?", a: "Oui, toutes nos unités sont 100 % meublées, avec électroménagers et literie inclus. Il suffit d'arriver avec votre valise." },
  { q: "À quelle vitesse puis-je emménager ?", a: "La prise de possession est rapide : vous choisissez la date souhaitée, et certaines unités peuvent être disponibles dès le jour même de votre demande." },
  { q: "Y a-t-il un engagement à long terme ?", a: "Non. Aucun engagement à long terme n'est requis : vous gardez la liberté de rester le temps qu'il vous faut." },
  { q: "Offrez-vous du soutien durant mon séjour ?", a: "Oui, notre service à la clientèle et d'entretien est disponible 24/7." },
  { q: "Louez-vous aux entreprises et aux sinistrés ?", a: "Oui. Nous logeons particuliers, employés d'entreprises, ainsi que les personnes sinistrées en collaboration avec leur assureur." },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-background-2 py-[clamp(5rem,14vh,9rem)] glow">
      <div className="mx-auto w-[min(760px,100%-2.4rem)]">
        <p className="eyebrow" data-reveal>FAQ</p>
        <h2 className="h2" data-reveal data-delay="0.08">Foire aux questions</h2>
        <div className="mt-[clamp(2rem,5vw,3.5rem)] grid gap-3" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-white/2.5 px-6 transition-colors open:border-primary/40 open:bg-white/4.5">
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
