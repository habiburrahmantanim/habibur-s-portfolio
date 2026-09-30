"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Microscope } from "lucide-react";
import { journey, profile } from "../data/portfolio";
import { Reveal } from "./Reveal";

const icons = [BriefcaseBusiness, GraduationCap, Microscope];
const labels = ["Experience", "Education", "Research"];

export function Journey() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const current = journey[activeTab];

  function handleTab(index: number) {
    if (index === activeTab || isAnimating) return;
    setIsAnimating(true);
    setActiveTab(index);
    setTimeout(() => setIsAnimating(false), 400);
  }

  return (
    <section id="journey" className="section-block journey-section">
      {/* Section heading */}
      <Reveal>
        <div className="section-kicker">Journey</div>
      </Reveal>
      <Reveal>
        <div className="section-heading-row">
          <div>
            <h2>
              From foundations
              <br />
              <em>to forward motion.</em>
            </h2>
          </div>
          <p>
            A curated record of milestones, education, and research shaping how
            I build, learn, and contribute to the digital landscape.
          </p>
        </div>
      </Reveal>

      {/* Curtain stage */}
      <div className="page-curtain-stage">
        {/* Tabs */}
        <div className="page-curtain-tabs" role="tablist" aria-label="Journey categories">
          {journey.map((item, index) => {
            const Icon = icons[index] || BriefcaseBusiness;
            return (
              <button
                key={item.label}
                role="tab"
                aria-selected={activeTab === index}
                disabled={isAnimating}
                onClick={() => handleTab(index)}
              >
                <Icon size={14} />
                {labels[index]}
                <span>{item.period}</span>
              </button>
            );
          })}
        </div>

        {/* Animated card */}
        <div className="page-curtain-page" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, rotateX: -8, y: 18 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 6, y: -14 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="journey-page-content"
            >
              <div className="journey-page-card">
                {/* Meta row */}
                <div className="journey-page-meta">
                  <span className="journey-page-icon">
                    {(() => {
                      const Icon = icons[activeTab] || BriefcaseBusiness;
                      return <Icon size={14} />;
                    })()}
                  </span>
                  <span>{current.label}</span>
                  <span>{current.place}</span>
                </div>

                {/* Title */}
                <h3>{current.title}</h3>

                {/* Organisation */}
                <strong>{current.place}</strong>

                {/* Description */}
                <p>{current.description}</p>

                {/* Tags */}
                <div className="tag-row">
                  {current.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA button — mirrors the hero section style */}
      <Reveal delay={0.1}>
        <div className="journey-cta">
          <a
            className="button button-primary"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="View full profile on GitHub"
          >
            View full profile <ArrowUpRight size={15} />
          </a>
          <a
            className="button button-dark"
            href={`mailto:${profile.email}`}
            aria-label="Send Habibur an email"
          >
            Get in touch <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}