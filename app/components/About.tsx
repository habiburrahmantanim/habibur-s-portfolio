import { Code2, Database, GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { TechMarquee } from "./TechMarquee";

export function About() {
  return (
    <section id="about" className="section-shell section-block">
      <Reveal>
        <div className="section-kicker">About</div>
      </Reveal>
      <div className="about-grid">
        <Reveal>
          <h2>
            Curious by default.
            <br />
            <span>Precise by practice.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="about-copy">
            <p>
              I&apos;m a Computer Science &amp; Engineering graduate from Green
              University of Bangladesh. My work spans thoughtful frontend
              development, dependable backend workflows, and applied machine
              learning.
            </p>
            <p>
              During my internship at Object Canvas Technology, I built
              production-ready interfaces with React, Next.js, and Tailwind CSS
              — connected to real APIs and shaped by the small details that make
              software feel good to use.
            </p>
          </div>
        </Reveal>
      </div>

      <TechMarquee />

      <div className="about-facts">
        <div>
          <Code2 size={20} />
          <strong>Web craft</strong>
          <span>Responsive interfaces &amp; reusable systems</span>
        </div>
        <div>
          <Database size={20} />
          <strong>Data thinking</strong>
          <span>Python, SQL, analytics &amp; APIs</span>
        </div>
        <div>
          <GraduationCap size={20} />
          <strong>Research</strong>
          <span>Published at ECCT 2026</span>
        </div>
      </div>
    </section>
  );
}
