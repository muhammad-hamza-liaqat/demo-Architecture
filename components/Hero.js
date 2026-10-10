"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_ID = "1061310840";
const VIDEO_HASH = "8e047906e0";
const START = 59; // 0:59
const END = 80; // 1:20

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
  const holder = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let player;
    let iframe;
    let ready = false;
    let target = START;
    let lastSent = -1;
    let timer;
    let cancelled = false;

    // Seeking is a network round-trip, so send at most one seek per tick.
    const tick = () => {
      if (ready && Math.abs(target - lastSent) >= 0.05) {
        lastSent = target;
        player.setCurrentTime(target).catch(() => {});
      }
    };

    // The iframe is created here (not in JSX) because Player.destroy() removes it
    // from the DOM, which would otherwise clash with React's own unmounting.
    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled) return;
      iframe = document.createElement("iframe");
      iframe.title = "Architecture film";
      iframe.src = `https://player.vimeo.com/video/${VIDEO_ID}?h=${VIDEO_HASH}&muted=1&controls=0&title=0&byline=0&portrait=0&dnt=1`;
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.className =
        "pointer-events-none absolute left-1/2 top-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0 opacity-0";
      holder.current.appendChild(iframe);
      player = new Player(iframe);
      player.on("error", (e) => console.warn("[hero video] player error", e));
      // If Vimeo never reports ready (blocked embed, privacy settings), show its own error instead of hiding it.
      const giveUp = setTimeout(() => {
        console.warn("[hero video] player not ready after 8s; revealing iframe so Vimeo's message is visible");
        gsap.to(iframe, { opacity: 1, duration: 0.3 });
      }, 8000);
      player.ready().then(() => {
        clearTimeout(giveUp);
        if (cancelled) return;
        ready = true;
        console.info("[hero video] ready");
        gsap.to(iframe, { opacity: 1, duration: 0.6 });
        player.setVolume(0).catch(() => {});
        // Vimeo only seeks reliably once playback has started, so play muted, jump to START, then pause.
        player
          .play()
          .then(() => player.setCurrentTime(START))
          .then(() => player.pause())
          .catch((err) => console.warn("[hero video]", err));
        timer = setInterval(tick, 120);
      });
    });

    const ctx = gsap.context(() => {
      const copies = gsap.utils.toArray("[data-hero-copy]");
      gsap.set(copies, { opacity: 0, y: 30, filter: "blur(10px)" });

      const total = 7;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            target = START + (END - START) * self.progress;
          },
        },
      });

      // Slow push-in across the whole scroll.
      tl.fromTo("[data-hero-video]", { scale: 1.0 }, { scale: 1.15, duration: total }, 0);

      // Headline stages fade in/out against the footage.
      copies.forEach((el, i) => {
        const at = 0.8 + i * 2;
        tl.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, at);
        if (i < copies.length - 1) {
          tl.to(el, { opacity: 0, y: -24, filter: "blur(10px)", duration: 0.5 }, at + 1.4);
        }
      });
      tl.set({}, {}, total); // pad the timeline to its full length

      gsap.to("[data-hero-cue]", {
        opacity: 0,
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=200", scrub: true },
      });
    }, root);

    return () => {
      cancelled = true;
      clearInterval(timer);
      ctx.revert();
      (player ? player.destroy().catch(() => {}) : Promise.resolve()).finally(() => iframe?.remove());
    };
  }, []);

  return (
    <section id="top" className="relative h-screen overflow-hidden" ref={root}>
      <div className="absolute inset-0 size-full">
        <div data-hero-video className="absolute inset-0 origin-[50%_55%] will-change-transform">
          {/* Poster shown until the video is ready. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="absolute inset-0 size-full object-cover" src="/images/hero-1.jpg" alt="" fetchPriority="high" />
          {/* Vimeo iframe is injected here by the effect. */}
          <div ref={holder} className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.15)_55%,transparent_100%),linear-gradient(0deg,rgba(0,0,0,0.55)_0%,transparent_40%)]" />
      </div>

      <div className="absolute bottom-[clamp(3rem,12vh,7rem)] left-[clamp(1.2rem,5vw,4rem)] max-w-120">
        {copy.map((s) => (
          <div key={s.title} data-hero-copy className="absolute bottom-0 left-0 w-[min(30rem,88vw)] opacity-0 will-change-[transform,opacity,filter]">
            <h1 className="mb-[1.1rem] font-serif text-[clamp(2.2rem,5.2vw,4rem)] font-normal leading-[1.08]">{s.title}</h1>
            <p className="max-w-104 text-[0.92rem] text-foreground/80">{s.text}</p>
          </div>
        ))}
      </div>

      <div data-hero-cue className="absolute bottom-[2.2rem] right-[clamp(1.2rem,5vw,4rem)] text-[0.65rem] uppercase tracking-[0.3em] text-white/70">
        Scroll
      </div>
    </section>
  );
}
