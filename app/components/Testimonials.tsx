import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { testimonials } from "../data/portfolio";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-shell section-block testimonials-section">
      <Reveal>
        <div className="section-kicker">Testimonials</div>
      </Reveal>
      <Reveal>
        <h2>
          Good work is a
          <br />
          <span>team sport.</span>
        </h2>
      </Reveal>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <article className="testimonial-card">
              <Quote size={21} />
              <p>&ldquo;{item.quote}&rdquo;</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}