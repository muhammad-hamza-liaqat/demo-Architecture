// Placeholder sectors — swap for real client names/logos once confirmed.
const clients = ["Promoteurs immobiliers", "Institutions financières", "Cabinets d'assurance", "Hôtellerie", "Technologie", "Propriétaires privés"];

export default function Clients() {
  return (
    <section aria-label="Clients" className="bg-background py-[clamp(4rem,10vh,6rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)] text-center">
        <p className="eyebrow" data-reveal>Ils nous font confiance</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-4" data-reveal data-delay="0.08">
          {clients.map((c) => (
            <li key={c} className="rounded-full border border-border px-5 py-2 text-[0.8rem] text-foreground/60">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
