"use client";

import { ArrowUpRight, Check, GitBranch, Mail, UsersRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <section
      id="contact"
      className="section-shell section-block contact-section"
    >
      <Reveal>
        <div className="section-kicker">Contact</div>
      </Reveal>
      <Reveal>
        <h2>
          Have a good idea?
          <br />
          <em>Let&apos;s make it real.</em>
        </h2>
      </Reveal>
      <div className="contact-grid">
        <Reveal delay={0.1}>
          <div>
            <p className="contact-intro">
              Whether you have a project, an opportunity, or a question about
              the work, my inbox is open.
            </p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={18} />
            </a>
            <div className="social-row">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitBranch size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <UsersRound size={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <form className="contact-form" onSubmit={submit}>
            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Message
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell me a little about it..."
              />
            </label>
            <button className="button button-dark" type="submit">
              {sent ? (
                <>
                  Sent <Check size={16} />
                </>
              ) : (
                <>
                  Send message <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
