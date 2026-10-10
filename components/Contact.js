"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    // No backend yet: wire this to an API route, Formspree, Resend, etc.
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container container--narrow">
        <h2 className="h2" data-reveal>Start Your Project</h2>
        <p className="sub" data-reveal data-delay="0.08">demo.com — Architecture &amp; Interior Design</p>

        {sent ? (
          <p className="thanks" data-reveal>Thank you — we&apos;ll be in touch shortly.</p>
        ) : (
          <form className="form" onSubmit={onSubmit} data-reveal data-delay="0.12">
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="your@email.com" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows="4" placeholder="Tell us about your project" required />
            </label>
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
      <footer className="footer">© {new Date().getFullYear()} demo.com</footer>
    </section>
  );
}
