import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Journey } from "./components/Journey";
import { Testimonials } from "./components/Testimonials";
import { Work } from "./components/Work";
import { SplitTextReveal } from "./components/SplitTextReveal";
import GlyphPortal from "@/components/ui/glyph-portal";
import { ArrowUpRight, Briefcase, FolderOpen, Mail, User } from "lucide-react";

export default function Home() {
  return (
    <>
      <main>
        <GlyphPortal
          id="home"
          word="HABIB"
          initialTheme="emerald"
          interactive={false}
          front={
            <div className="glyph-portal-home-intro">
              <span>WEB / DATA / RESEARCH</span>
              <h1>
                Build for people.
                <br />
                Think with data.
              </h1>
              <SplitTextReveal text="Habibur Rahman / Web developer and data-minded builder" />
            </div>
          }
        >
          <div className="portfolio-portal-content">
            <span>HABIBUR RAHMAN / PORTFOLIO</span>
            <h2>People-first products. Data-led decisions.</h2>
            <p>
              Explore a practice spanning responsive web experiences, practical
              machine learning, and data-driven solutions.
            </p>
            <nav aria-label="Explore the portfolio">
              <a href="#about" className="hero-nav-btn">
                <User size={13} /> About
              </a>
              <a href="#journey" className="hero-nav-btn hero-nav-btn--accent">
                <Briefcase size={13} /> Experience
              </a>
              <a href="#work" className="hero-nav-btn">
                <FolderOpen size={13} /> Work
              </a>
              <a href="#contact" className="hero-nav-btn">
                <Mail size={13} /> Contact <ArrowUpRight size={12} />
              </a>
            </nav>
          </div>
        </GlyphPortal>
        <About />
        <Journey />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

