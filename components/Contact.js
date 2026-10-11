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
    <section id="contact" className="bg-background py-[clamp(5rem,14vh,9rem)] glow">
      <div className="mx-auto w-[min(640px,100%-2.4rem)] rounded-3xl border border-border bg-white/2.5 p-[clamp(1.5rem,5vw,3rem)]">
        <p className="eyebrow" data-reveal>Contact</p>
        <h2 className="h2" data-reveal>Démarrez votre projet</h2>
        <p className="mt-[0.4rem] text-[0.8rem] text-muted-foreground" data-reveal data-delay="0.08">demo.com — Architecture et design d&apos;intérieur</p>

        {sent ? (
          <p className="mt-[2.2rem] text-primary" data-reveal>Merci — nous vous répondrons très bientôt.</p>
        ) : (
          <form className="mt-[2.2rem] grid gap-[1.6rem]" onSubmit={onSubmit} data-reveal data-delay="0.12">
            <div className="grid gap-[1.6rem] min-[601px]:grid-cols-2">
              <div>
                <Label htmlFor="firstname">Prénom</Label>
                <Input id="firstname" name="firstname" type="text" placeholder="Votre prénom" autoComplete="given-name" required />
              </div>
              <div>
                <Label htmlFor="lastname">Nom</Label>
                <Input id="lastname" name="lastname" type="text" placeholder="Votre nom" autoComplete="family-name" required />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Entreprise (facultatif)</Label>
              <Input id="company" name="company" type="text" placeholder="Votre entreprise" autoComplete="organization" />
            </div>
            <div className="grid gap-[1.6rem] min-[601px]:grid-cols-2">
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(000) 000-0000" autoComplete="tel" required />
              </div>
              <div>
                <Label htmlFor="email">Courriel</Label>
                <Input id="email" name="email" type="email" placeholder="votre@courriel.com" autoComplete="email" required />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={4} placeholder="Parlez-nous de votre projet" required />
            </div>
            <p className="text-[0.7rem] text-muted-foreground">
              Les renseignements transmis serviront uniquement à vous répondre au sujet de nos services.
            </p>
            <Button type="submit" className="justify-self-start">Envoyer le message</Button>
          </form>
        )}
      </div>
    </section>
  );
}
