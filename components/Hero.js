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
    // Stop the mobile URL bar showing/hiding from re-measuring (and jolting) the pinned hero.
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.registerPlugin(ScrollTrigger);

    let player;
    let iframe;
    let target = START; // where the (smoothed) scroll says the playhead should be
    let current = START; // eased value actually sent to the player
    let lastSent = START;
    let live = false; // scrubbing only starts once the video is revealed at START
    let busy = false;
    let timer;
    let cancelled = false;

    // Seeking is a network round-trip. Wait for each seek to finish before sending the next
    // (queued seeks are what makes scrubbing feel like it's stuck), and ease toward the target
    // so the requests are small, continuous steps rather than big jumps.
    const step = async () => {
      if (cancelled) return;
      if (live && !busy) {
        current += (target - current) * 0.4;
        if (Math.abs(target - current) < 0.03) current = target;
        if (Math.abs(current - lastSent) >= 0.04) {
          busy = true;
          lastSent = current;
          try {
            await player.setCurrentTime(current);
          } catch {}
          busy = false;
        }
      }
      timer = setTimeout(step, 40);
    };

    // The iframe is created here (not in JSX) because Player.destroy() removes it
    // from the DOM, which would otherwise clash with React's own unmounting.
    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled) return;
      iframe = document.createElement("iframe");
      iframe.title = "Architecture film";
      iframe.src = `https://player.vimeo.com/video/${VIDEO_ID}?h=${VIDEO_HASH}&muted=1&controls=0&title=0&byline=0&portrait=0&dnt=1&autoplay=1&playsinline=1#t=${START}s`;
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      // 16:9 box that always covers the hero, on landscape and portrait screens alike.
      iframe.className =
        "pointer-events-none absolute left-1/2 top-1/2 h-[max(100svh,56.25vw)] w-[max(100vw,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0 opacity-0";
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
        console.info("[hero video] ready");
        player.setVolume(0).catch(() => {});
        // The embed opens at 0:00 (the logo intro), so keep it hidden until the playhead has
        // verifiably reached START. autoplay=1&muted=1 means it is already playing, which is
        // when Vimeo seeks reliably. Seek, pause, then check where we really are; retry if not.
        const reveal = () => {
          lastSent = current = START;
          live = true;
          gsap.to(iframe, { opacity: 1, duration: 0.6 });
        };
        const revealTimeout = setTimeout(() => {
          console.warn("[hero video] could not confirm seek to START after 10s; revealing anyway");
          reveal();
        }, 10000);
        const seekToStart = async (attempt = 0) => {
          if (cancelled) return;
          try {
            await player.setCurrentTime(START);
            await player.pause();
            await new Promise((r) => setTimeout(r, 250)); // let the seeked frame paint
            const at = await player.getCurrentTime();
            if (at < START - 0.5 || at > START + 2) throw new Error(`playhead at ${at}s`);
            clearTimeout(revealTimeout);
            reveal();
          } catch (err) {
            console.warn("[hero video] seek attempt", attempt, err);
            if (attempt < 8) setTimeout(() => seekToStart(attempt + 1), 500);
          }
        };
        seekToStart();
        step();
      });
    });

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
          // The timeline's playhead is the scrub-smoothed scroll position, so the video follows
          // that rather than the raw (jumpy) scroll value.
          onUpdate: () => {
            target = START + (END - START) * tl.progress();
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (mobile ? 3 : 4)}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 0.8,
          },
        });

        // Slow push-in across the whole scroll (gentler on phones).
        tl.fromTo("[data-hero-video]", { scale: 1.0 }, { scale: mobile ? 1.08 : 1.15, duration: total }, 0);

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
      clearTimeout(timer);
      mm.revert();
      (player ? player.destroy().catch(() => {}) : Promise.resolve()).finally(() => iframe?.remove());
    };
  }, []);

  return (
    <section id="top" className="relative h-svh overflow-hidden" ref={root}>
      <div className="absolute inset-0 size-full">
        <div data-hero-video className="absolute inset-0 origin-[50%_55%] transform-gpu will-change-transform">
          {/* Black until the video has seeked to START, so the 0:00 logo intro never shows. */}
          <div className="absolute inset-0 bg-black" />
          {/* Vimeo iframe is injected here by the effect. */}
          <div ref={holder} className="absolute inset-0" />
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
