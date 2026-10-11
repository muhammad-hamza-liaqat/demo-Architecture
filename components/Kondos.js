"use client";

import { useState } from "react";
import SectionHead from "@/components/SectionHead";

// Photos are placeholders — swap each `img` for the unit's own picture.
const imgs = ["/images/project-1.jpg", "/images/project-2.jpg", "/images/project-3.jpg", "/images/tip-1.jpg", "/images/tip-2.jpg", "/images/tip-3.jpg"];
const units = [
  ["Condo Le Marmen", "3 chambres", "Trois-Rivières"],
  ["Condo Le Bleury", "1 chambre", "Quartier des Spectacles"],
  ["Maison Lenoir", "3 chambres", "Brossard"],
  ["Maison La Concorde", "3 chambres · 3 salles de bains", "Saint-Henri de Lévis"],
  ["Maison du Ruisseau", "3 chambres", "Saint-Hyacinthe"],
  ["Condo Le Bastien", "2 chambres · 2 salles de bains", "Lebourgneuf"],
  ["Condo Le René Lévesque", "2 chambres", "Sherbrooke"],
  ["Maison La Nomade", "3 chambres", "Nomades"],
  ["Condo Le Centrale", "2 chambres", "Sainte-Catherine"],
  ["Condo Labelle", "2 chambres", "Laval"],
  ["Condo Le Roland-Beaudin", "2 chambres · 2 salles de bains", "Sainte-Foy"],
  ["Condo La Couronne", "1 chambre", "Centre-Ville de Québec"],
  ["Condo Jarry", "2 chambres", "Saint-Michel | Villeray"],
  ["Condo Abraham", "2 chambres · 2 salles de bains", "Mont-Royal"],
  ["Condo Marc Chagall", "2 chambres · 2 salles de bains", "Mont-Royal"],
  ["Condo Bel-Air", "3 chambres", "Westmount"],
  ["Maison Quatre-Bourgeois", "3 chambres · 2 salles de bains", "Sainte-Foy"],
  ["Condo des Seigneurs", "2 chambres · 2 salles de bains", "Griffintown"],
].map(([name, rooms, city], i) => ({ name, rooms, city, img: imgs[i % imgs.length] }));

export default function Kondos() {
  const [all, setAll] = useState(false);
  const shown = all ? units : units.slice(0, 6);

  return (
    <section id="kondos" className="glow bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(1120px,100%-2.4rem)]">
        <div className="flex flex-col gap-6 min-[801px]:flex-row min-[801px]:items-end min-[801px]:justify-between">
          <SectionHead eyebrow="Disponibles maintenant" title="Découvrez nos Kondos du jour" />
          <a href="#contact" className="w-fit rounded-full bg-primary px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-foreground" data-reveal>
            Recherchez votre Kondo
          </a>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1001px]:grid-cols-3">
          {shown.map((u) => (
            <a key={u.name + u.city} href="#contact" className="group overflow-hidden rounded-2xl border border-border bg-white/2.5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.img} alt={u.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[0.65rem] tracking-[0.08em] backdrop-blur-md">{u.city}</span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-[1.2rem] font-normal">{u.name}</h3>
                <p className="mt-1 text-[0.8rem] text-muted-foreground">{u.rooms}</p>
              </div>
            </a>
          ))}
        </div>

        {!all && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setAll(true)} className="cursor-pointer rounded-full border border-border px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:border-primary/60 hover:text-primary">
              Voir les {units.length} unités
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
