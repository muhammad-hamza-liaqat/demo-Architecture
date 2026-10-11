"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder figures — the original's counters animate from 0; confirm the real numbers.
const stats = [
  { value: 400, label: "Kondos" },
  { value: 60, label: "Secteurs" },
  { value: 350, label: "Adresses" },
];

export default function Stats() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: Number(el.dataset.count),
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
    <section ref={root} aria-label="Chiffres clés" className="bg-background py-[clamp(3rem,8vh,5rem)]">
      <div className="mx-auto grid w-[min(1120px,100%-2.4rem)] grid-cols-3 gap-4 rounded-3xl border border-border bg-white/2.5 px-4 py-10 text-center min-[801px]:py-14">
        {stats.map((s) => (
          <div key={s.label} data-reveal>
            <p className="font-serif text-[clamp(2rem,6vw,4rem)] leading-none text-primary">
              <span data-count={s.value}>{s.value}</span> +
            </p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground min-[801px]:text-[0.65rem]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
