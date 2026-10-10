"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// public/videos/hero.mp4 is the 0:59-1:20 cut of the film, encoded with a keyframe on every
// frame so the playhead can be scrubbed in both directions without stalling.
const VIDEO_SRC = "/videos/hero.mp4";
const POSTER_SRC = "/images/hero-poster.jpg";

const copy = [
  {
    title: "Where Vision Meets Architecture",
    text: "Every great space starts with how it sits in its environment — light, shadow, and scale, considered before a single wall is drawn.",
  },
  {
    title: "The Entrance Sets the Tone",
    text: "A threshold is never just a door. It's the first decision a guest makes about how a home feels before they've stepped inside.",
  },
  {
    title: "Interiors That Breathe",
    text: "Open-plan living isn't about removing walls. It's about directing how light, movement, and furniture work together as one composition.",
  },
];

export default function Hero() {
  const root = useRef(null);
  const videoEl = useRef(null);

  useEffect(() => {
    // Stop the mobile URL bar showing/hiding from re-measuring (and jolting) the pinned hero.
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.registerPlugin(ScrollTrigger);

    const video = videoEl.current;
    let progress = 0; // scrub-smoothed scroll progress, 0..1
    let raf;

    // Write currentTime once per frame, and only when it actually changed.
    const render = () => {
      const d = video.duration;
      if (d) {
        const t = progress * (d - 0.05);
        if (Math.abs(video.currentTime - t) > 0.001) video.currentTime = t;
      }
    };
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // iOS Safari won't paint seeked frames until the video has been "played" once.
    // Do that on the first touch/scroll (muted + playsinline is allowed), then pause straight away.
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
      removeUnlock();
    };
    const removeUnlock = () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });

    const mm = gsap.matchMedia();
    mm.add(
      { mobile: "(max-width: 800px)", desktop: "(min-width: 801px)" },
      (c) => {
        const { mobile } = c.conditions;
        const copies = gsap.utils.toArray("[data-hero-copy]");
        // Animating blur is expensive on phones, so phones get opacity + movement only.
        const hidden = { opacity: 0, y: mobile ? 20 : 30, filter: mobile ? "none" : "blur(10px)" };
        const shown = { opacity: 1, y: 0, filter: mobile ? "none" : "blur(0px)" };
        const leaving = { opacity: 0, y: mobile ? -16 : -24, filter: mobile ? "none" : "blur(10px)" };
        gsap.set(copies, hidden);

        const total = 7;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          // The timeline's playhead is the scrub-smoothed scroll position; the video follows it.
          onUpdate: () => {
            progress = tl.progress();
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (mobile ? 3 : 4)}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 0.5,
          },
        });

        // Slow push-in across the whole scroll (gentler on phones).
        tl.fromTo("[data-hero-video]", { scale: 1.0 }, { scale: mobile ? 1.06 : 1.12, duration: total }, 0);

        // Headline stages fade in/out against the footage.
        copies.forEach((el, i) => {
          const at = 0.8 + i * 2;
          tl.to(el, { ...shown, duration: 0.5 }, at);
          if (i < copies.length - 1) {
            tl.to(el, { ...leaving, duration: 0.5 }, at + 1.4);
          }
        });
        tl.set({}, {}, total); // pad the timeline to its full length

        gsap.to("[data-hero-cue]", {
          opacity: 0,
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=200", scrub: true },
        });
      },
      root.current
    );

    return () => {
      cancelAnimationFrame(raf);
      removeUnlock();
      mm.revert();
    };
  }, []);

  return (
    <section id="top" className="relative h-svh overflow-hidden bg-black" ref={root}>
      <div className="absolute inset-0 size-full">
        <div data-hero-video className="absolute inset-0 origin-[50%_55%] transform-gpu will-change-transform">
          <video
            ref={videoEl}
            className="absolute inset-0 size-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.15)_55%,transparent_100%),linear-gradient(0deg,rgba(0,0,0,0.55)_0%,transparent_40%)]" />
        {/* Extra bottom scrim on phones, where the text sits over the full width of the footage. */}
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent min-[801px]:hidden" />
      </div>

      <div className="absolute bottom-[clamp(3.5rem,12vh,7rem)] left-[clamp(1.2rem,5vw,4rem)] max-w-120">
        {copy.map((s) => (
          <div key={s.title} data-hero-copy className="absolute bottom-0 left-0 w-[min(30rem,calc(100vw-2.4rem))] opacity-0 will-change-[transform,opacity]">
            <h1 className="mb-[1.1rem] font-serif text-[clamp(2rem,5.2vw,4rem)] font-normal leading-[1.08]">{s.title}</h1>
            <p className="max-w-104 text-[0.92rem] text-foreground/80">{s.text}</p>
          </div>
        ))}
      </div>

      <div data-hero-cue className="absolute bottom-[1.6rem] right-[clamp(1.2rem,5vw,4rem)] text-[0.65rem] uppercase tracking-[0.3em] text-white/70 min-[801px]:bottom-[2.2rem]">
        Scroll
      </div>
    </section>
  );
}
