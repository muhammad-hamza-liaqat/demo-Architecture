"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      const imgs = gsap.utils.toArray(".hero__img");
      const copies = gsap.utils.toArray(".hero__copy");
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

      gsap.to(".hero__cue", {
        opacity: 0,
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=200", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__stack">
        {stages.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s.src} className="hero__img" src={s.src} alt="" fetchPriority={i === 0 ? "high" : "auto"} />
        ))}
        <div className="hero__shade" />
      </div>

      <div className="hero__copies">
        {stages.filter((s) => s.title).map((s) => (
          <div key={s.title} className="hero__copy">
            <h1>{s.title}</h1>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="hero__cue">Scroll</div>
    </section>
  );
}
