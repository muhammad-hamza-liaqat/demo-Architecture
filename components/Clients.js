// Placeholder sectors — swap for real client names/logos once confirmed.
const clients = ["Promoteurs immobiliers", "Institutions financières", "Cabinets d'assurance", "Hôtellerie", "Technologie", "Propriétaires privés"];

export default function Clients() {
  return (
    <section aria-label="Clients" className="bg-background py-[clamp(4rem,10vh,6rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)] text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground" data-reveal>Ils nous font confiance</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-4" data-reveal data-delay="0.08">
          {clients.map((c) => (
            <li key={c} className="font-serif text-[1.05rem] text-foreground/45">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
