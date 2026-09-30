import type { ReactNode } from "react";

type GooeyMarqueeProps = {
  text?: string;
  items?: { label: string; icon: ReactNode }[];
};

const copies = [0, 1];

export function GooeyMarquee({ text = "", items = [] }: GooeyMarqueeProps) {
  const accessibleText = items.length
    ? items.map((item) => item.label).join(", ")
    : text;

  const renderContent = () =>
    items.length ? (
      items.map((item) => (
        <span className="gooey-marquee-item" key={item.label}>
          <span className="gooey-marquee-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
          <span className="gooey-marquee-separator" aria-hidden="true">
            /
          </span>
        </span>
      ))
    ) : (
      text
    );

  return (
    <div className="gooey-marquee" role="img" aria-label={accessibleText}>
      <div
        className="gooey-marquee-layer gooey-marquee-blur"
        aria-hidden="true"
      >
        <div className="gooey-marquee-track">
          {copies.map((copy) => (
            <span className="gooey-marquee-copy" key={copy}>
              {renderContent()}
            </span>
          ))}
        </div>
      </div>
      <div
        className="gooey-marquee-layer gooey-marquee-crisp"
        aria-hidden="true"
      >
        <div className="gooey-marquee-track">
          {copies.map((copy) => (
            <span className="gooey-marquee-copy" key={copy}>
              {renderContent()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
