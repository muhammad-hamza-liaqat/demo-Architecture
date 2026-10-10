"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    // No backend yet: wire this to an API route, Formspree, Resend, etc.
    setSent(true);
  }

  return (
    <section id="contact" className="bg-background py-[clamp(5rem,14vh,9rem)]">
      <div className="mx-auto w-[min(560px,100%-2.4rem)]">
        <h2 className="mt-[0.6rem] font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1]" data-reveal>Start Your Project</h2>
        <p className="mt-[0.4rem] text-[0.8rem] text-muted-foreground" data-reveal data-delay="0.08">demo.com — Architecture &amp; Interior Design</p>

        {sent ? (
          <p className="mt-[2.2rem] text-primary" data-reveal>Thank you — we&apos;ll be in touch shortly.</p>
        ) : (
          <form className="mt-[2.2rem] grid gap-[1.6rem]" onSubmit={onSubmit} data-reveal data-delay="0.12">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={4} placeholder="Tell us about your project" required />
            </div>
            <Button type="submit" className="justify-self-start">Send Message</Button>
          </form>
        )}
      </div>
      <footer className="mt-[clamp(4rem,10vh,7rem)] text-center text-[0.7rem] tracking-[0.1em] text-muted-foreground">© {new Date().getFullYear()} demo.com</footer>
    </section>
  );
}
