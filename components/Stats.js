"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder figures — replace with the studio's real numbers.
const stats = [
  { value: 120, suffix: "+", label: "Projets réalisés" },
  { value: 15, suffix: "", label: "Années d'expérience" },
  { value: 30, suffix: "+", label: "Villes desservies" },
];

export default function Stats() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(o.v)),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Chiffres clés" className="bg-background py-[clamp(4rem,10vh,7rem)]">
      <div className="mx-auto grid w-[min(1120px,100%-2.4rem)] grid-cols-1 gap-10 border-y border-border py-12 text-center min-[801px]:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal data-delay={0.1 * i}>
            <p className="font-serif text-[clamp(2.6rem,6vw,4rem)] leading-none text-primary">
              <span data-count={s.value}>{s.value}</span>{s.suffix}
            </p>
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
