"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fades + un-blurs every [data-reveal] element as it scrolls into view,
// and reverses when it scrolls back out.
export default function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const delay = Number(el.dataset.delay || 0);
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
