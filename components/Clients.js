import SectionHead from "@/components/SectionHead";

// Names only (no logos) — add the real logo files if you have permission to use them.
const clients = ["Broccolini", "Familiprix", "Hitachi", "Desjardins", "Honeywell", "Jadco", "Canam-Ponts", "Air Canada", "Cascades", "Pur Industriel", "Vista", "Promutuel Assurance", "MAch", "Cromwell", "Ubisoft", "Trantor", "Air Transat", "Norda Stelo", "Damco", "Devimco Immobilier", "Pur", "IA Auto et habitation", "Capreit"];

export default function Clients() {
  return (
    <section aria-label="Témoignages" className="bg-background-2 py-[clamp(4rem,10vh,7rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <SectionHead center eyebrow="Témoignages" title="Ils nous font confiance" />
        <ul className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          {clients.map((c) => (
            <li key={c} className="rounded-full border border-border bg-white/2.5 px-5 py-2.5 font-serif text-[0.95rem] text-foreground/70">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
