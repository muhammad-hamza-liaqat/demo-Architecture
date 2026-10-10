"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_TIME_MAP } from "@/lib/hero-time-map";

// public/videos/hero.mp4 is the 1:14-1:29 cut of the film, encoded small (a keyframe every 8 frames)
// so it downloads quickly yet can still be scrubbed in both directions without stalling.
const VIDEO_SRC = `/videos/hero.mp4?v=${process.env.NEXT_PUBLIC_ASSET_V ?? ""}`;
const POSTER_SRC = "/images/hero-poster.jpg";
const FPS = 24000 / 1001; // source frame rate

// Scroll progress (0..1) -> video time, via a table that evens out the visible speed of the footage.
const timeAt = (p) => {
  const x = Math.min(Math.max(p, 0), 1) * (HERO_TIME_MAP.length - 1);
  const i = Math.min(Math.floor(x), HERO_TIME_MAP.length - 2);
  return HERO_TIME_MAP[i] + (HERO_TIME_MAP[i + 1] - HERO_TIME_MAP[i]) * (x - i);
};

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
    let cancelled = false;
    let objectUrl;

    // A refresh would otherwise restore a mid-page scroll position, and the scrub would appear to
    // start "from the middle". Always open the hero at its beginning (unless the URL has a #section).
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    // Download the (small, ~3MB) clip into memory so every seek is instant. Nothing blocks the page
    // while it loads: the poster shows, scrolling works, and the video joins in as soon as it arrives.
    // Retry a couple of times on a flaky connection.
    const loadVideo = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(VIDEO_SRC);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.blob();
        } catch (err) {
          if (cancelled) return null;
          console.warn(`[hero video] download attempt ${attempt + 1} failed`, err);
          await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
        }
      }
      return null;
    };

    (async () => {
      const blob = await loadVideo();
      if (cancelled) return;
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      } else {
        console.warn("[hero video] could not preload, falling back to streaming");
        video.src = VIDEO_SRC;
      }
      video.load();
    })();

    let progress = 0; // scrub-smoothed scroll progress, 0..1
    let shown = 0; // eased playhead (seconds) that is actually written to the video
    let raf;

    // Once per frame, ease the playhead toward the scroll position instead of snapping to it.
    // Frame-rate independent, so it feels the same at 60Hz and 120Hz. Only writes when it moved.
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const d = video.duration;
      if (d) {
        const target = Math.min(timeAt(progress), d - 0.05);
        const k = 1 - Math.exp(-dt / 140); // ~140ms time constant
        shown += (target - shown) * k;
        if (Math.abs(target - shown) < 0.004) shown = target;
        // Snap to the middle of a source frame, and never start a seek while one is still in
        // flight: overlapping seeks can paint frames out of order, which reads as shaking.
        const frameTime = Math.min((Math.round(shown * FPS) + 0.5) / FPS, d - 0.05);
        if (!video.seeking && Math.abs(video.currentTime - frameTime) > 0.5 / FPS) video.currentTime = frameTime;
      }
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
            end: () => `+=${window.innerHeight * (mobile ? 12 : 9)}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 0.3,
          },
        });

        // A 16:9 video cropped to a portrait screen only shows its middle third. On phones, drift
        // the crop sideways across the scroll so more of the frame is seen (kept gentle: the
        // footage already moves, and a fast pan on top would read as shake).
        if (mobile) {
          tl.fromTo("[data-hero-video-el]", { objectPosition: "30% 50%" }, { objectPosition: "70% 50%", duration: total }, 0);
        }

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
      cancelled = true;
      history.scrollRestoration = prevRestoration;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      cancelAnimationFrame(raf);
      removeUnlock();
      mm.revert();
    };
  }, []);

  return (
    <section id="top" className="relative h-svh overflow-hidden bg-black" ref={root}>
      <div className="absolute inset-0 size-full">
        <div data-hero-video className="absolute inset-0">
          <video
            ref={videoEl}
            data-hero-video-el
            className="absolute inset-0 size-full object-cover"
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
            <h1 className="mb-[1.1rem] font-serif text-[clamp(2rem,5.2vw,4rem)] font-normal leading-[1.08] text-balance">{s.title}</h1>
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
