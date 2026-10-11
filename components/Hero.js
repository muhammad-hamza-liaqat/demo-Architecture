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
    title: "La solution de relocalisation temporaire",
    bullets: ["Location 100% meublé", "Durée de location flexible", "Prise de possession rapide", "+ 400 unités au Québec"],
    cta: { label: "Obtenir une offre de location", href: "#contact" },
    badge: true,
  },
  {
    title: "Prise de possession rapide",
    text: "Emménagez avec votre valise : des unités disponibles dès maintenant, parfois dès le jour de votre demande.",
  },
  {
    title: "+ 400 unités au Québec",
    text: "Des condos aux maisons complètes, une vaste sélection pour chaque situation.",
  },
];

// "#1 au Québec" seal shown beside the first headline.
function Badge() {
  return (
    <svg viewBox="0 0 120 120" className="mt-1 size-[4.4rem] shrink-0 -rotate-12 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] min-[801px]:mt-2 min-[801px]:size-[6.2rem]" role="img" aria-label="Numéro 1 au Québec">
      <defs>
        <path id="badge-arc" d="M 60 60 m -42 0 a 42 42 0 1 0 84 0" />
      </defs>
      <circle cx="60" cy="60" r="60" fill="#b8a894" />
      <text x="60" y="73" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontWeight="900" fontSize="46" fill="#1a1a1e">#1</text>
      <text fontFamily="var(--font-inter), sans-serif" fontWeight="800" fontSize="11" letterSpacing="2.2" fill="#1a1a1e">
        <textPath href="#badge-arc" startOffset="50%" textAnchor="middle">AU QUÉBEC</textPath>
      </text>
    </svg>
  );
}

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
          <div key={s.title} data-hero-copy className="pointer-events-none absolute bottom-0 left-0 w-[min(36rem,calc(100vw-2.4rem))] opacity-0 will-change-[transform,opacity]">
            <div className="flex items-start gap-5">
              <h1 className="mb-[1.1rem] min-w-0 font-serif text-[clamp(1.9rem,4.8vw,3.7rem)] font-normal leading-[1.08]">{s.title}</h1>
              {s.badge && <Badge />}
            </div>
            {s.text && <p className="max-w-104 text-[0.92rem] text-foreground/80">{s.text}</p>}
            {s.bullets && (
              <ul className="grid gap-2 text-[0.95rem] text-foreground/90">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-primary stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16 9.8" /></svg>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {s.cta && (
              <a href={s.cta.href} className="pointer-events-auto mt-7 inline-block rounded-xl bg-primary px-7 py-4 text-[0.9rem] font-medium text-primary-foreground transition-colors hover:bg-foreground">
                {s.cta.label}
              </a>
            )}
          </div>
        ))}
      </div>

      <div data-hero-cue className="absolute bottom-[1.6rem] right-[clamp(1.2rem,5vw,4rem)] text-[0.65rem] uppercase tracking-[0.3em] text-white/70 min-[801px]:bottom-[2.2rem]">
        Défiler
      </div>
    </section>
  );
}
