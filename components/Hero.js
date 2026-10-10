"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const stages = [
  { src: "/images/hero-1.jpg" },
  {
    src: "/images/hero-2.jpg",
    title: "Where Vision Meets Architecture",
    text: "Every great space starts with how it sits in its environment — light, shadow, and scale, considered before a single wall is drawn.",
  },
  {
    src: "/images/hero-3.jpg",
    title: "The Entrance Sets the Tone",
    text: "A threshold is never just a door. It's the first decision a guest makes about how a home feels before they've stepped inside.",
  },
  {
    src: "/images/hero-4.jpg",
    title: "Interiors That Breathe",
    text: "Open-plan living isn't about removing walls. It's about directing how light, movement, and furniture work together as one composition.",
  },
];

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray("[data-hero-img]");
      const copies = gsap.utils.toArray("[data-hero-copy]");
      const n = imgs.length;

      gsap.set(imgs, { opacity: 0, scale: 1.0 });
      gsap.set(imgs[0], { opacity: 1 });
      gsap.set(copies, { opacity: 0, y: 30, filter: "blur(10px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6 * (n - 1) + window.innerHeight}`,
          pin: true,
          scrub: 0.6,
        },
      });

      // Each stage: a slow push-in, then a crossfade into the next image.
      imgs.forEach((img, i) => {
        const at = i * 2;
        tl.fromTo(img, { scale: 1.0 }, { scale: 1.28, duration: 2.6 }, at);
        if (i < n - 1) {
          tl.to(imgs[i + 1], { opacity: 1, duration: 0.7 }, at + 1.9);
          tl.to(img, { opacity: 0, duration: 0.7 }, at + 2.3);
        }
      });

      // Headline stages fade in/out against the images.
      copies.forEach((el, i) => {
        const at = (i + 1) * 2 + 0.1;
        tl.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, at);
        if (i < copies.length - 1) {
          tl.to(el, { opacity: 0, y: -24, filter: "blur(10px)", duration: 0.5 }, at + 1.4);
        }
      });

      gsap.to("[data-hero-cue]", {
        opacity: 0,
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=200", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative h-screen overflow-hidden" ref={root}>
      <div className="absolute inset-0 size-full">
        {stages.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            data-hero-img
            className={cn("absolute inset-0 size-full origin-[50%_55%] object-cover will-change-[transform,opacity]", i === 0 ? "opacity-100" : "opacity-0")}
            src={s.src}
            alt=""
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.15)_55%,transparent_100%),linear-gradient(0deg,rgba(0,0,0,0.55)_0%,transparent_40%)]" />
      </div>

      <div className="absolute bottom-[clamp(3rem,12vh,7rem)] left-[clamp(1.2rem,5vw,4rem)] max-w-[30rem]">
        {stages.filter((s) => s.title).map((s) => (
          <div key={s.title} data-hero-copy className="absolute bottom-0 left-0 w-[min(30rem,88vw)] opacity-0 will-change-[transform,opacity,filter]">
            <h1 className="mb-[1.1rem] font-serif text-[clamp(2.2rem,5.2vw,4rem)] font-normal leading-[1.08]">{s.title}</h1>
            <p className="max-w-[26rem] text-[0.92rem] text-foreground/80">{s.text}</p>
          </div>
        ))}
      </div>

      <div data-hero-cue className="absolute bottom-[2.2rem] right-[clamp(1.2rem,5vw,4rem)] text-[0.65rem] uppercase tracking-[0.3em] text-white/70">
        Scroll
      </div>
    </section>
  );
}
