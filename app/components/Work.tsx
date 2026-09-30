import { Reveal } from "./Reveal";
import { WorksWheel } from "./WorksWheel";

export function Work() {
  return (
    <section id="work" className="section-shell section-block work-section">
      <Reveal>
        <div className="section-kicker">Selected Work</div>
      </Reveal>
      <Reveal>
        <div className="section-heading-row">
          <div>
            <h2>Ideas, built into working products.</h2>
          </div>
          <p>
            From useful interfaces to models that find patterns, each project
            starts with a question worth solving.
          </p>
        </div>
      </Reveal>
      <WorksWheel />
    </section>
  );
}

