import React from "react";

// ─────────────────────────────────────────────
// Technology SVG Logos
// ─────────────────────────────────────────────

const NextJSLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 8v8M8 8l8 8M14 8v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReactJSLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.3" />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.5"
      transform="rotate(60 12 12)"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="3.5"
      transform="rotate(120 12 12)"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const TypeScriptLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M7 9h5m-2.5 0v7M14.5 12c.8-.5 1.5-.6 2.2-.3.7.3 1.1 1 1 1.8-.2 1.2-1.7 1.7-2.7 2.2.8.5 1.8.8 2.5 1.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TailwindLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.001 6.002c-3 0-5.5 1.5-6.5 4.5 1-1.5 2.25-2 3.75-1.5 1.05.35 1.8 1.1 2.625 1.925C13.226 12.277 14.826 13.877 18.5 13.877c3 0 5.5-1.5 6.5-4.5-1 1.5-2.25 2-3.75 1.5-1.05-.35-1.8-1.1-2.625-1.925C17.276 7.602 15.676 6.002 12.001 6.002zM5.5 13.877c-3 0-5.5 1.5-6.5 4.5 1-1.5 2.25-2 3.75-1.5 1.05.35 1.8 1.1 2.625 1.925 1.35 1.35 2.95 2.95 6.625 2.95 3 0 5.5-1.5 6.5-4.5-1 1.5-2.25 2-3.75 1.5-1.05-.35-1.8-1.1-2.625-1.925C10.776 15.477 9.176 13.877 5.5 13.877z"
      fill="currentColor"
    />
  </svg>
);

const PythonLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11.8 2c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4s2.8 0 2.8 2.7v2.9h-5.7S5.4 11.2 5.4 15.4s3.3 4.1 3.3 4.1h2.2v-2.7s-.1-3.1 3.1-3.1h4.9s2.7.2 2.7-3.9V6.7S21.6 2 11.8 2zm-2.1 2.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
      fill="currentColor"
    />
  </svg>
);

const PostgreSQLLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.8 3.2c-2.4-1.7-6.8-1.5-9.5-.5C5.5 3.8 4.5 6.2 5 9c.4 2.2 1.5 3.6 2.8 4.4-.2 1.5-.1 3.1.3 4.4.3 1 1 1.7 2 1.8 1.1.1 1.8-.7 2-1.7l.4-2.2c.5.1 1 .1 1.5.1 1.8 0 3.6-.5 5-1.5 1.6-1.1 2.3-2.7 2.1-4.6-.2-2.4-1.3-4.9-3.3-6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.2 13.5c1.5.7 3.2.8 4.8.5M15.2 5.2c1.4.5 2.3 1.7 2.5 3.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MongoDBLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12.4 2.1c-.2 1.5-.8 2.5-1.7 3.5-1.8 2-3.5 4.1-3.5 7.1 0 3.8 2.2 6.4 4.5 7.6.2-1.7.2-3.1.1-4.5-.1-1.5-.1-3-.1-4.4 0-2.1.5-4.3.7-6.4.2-1.1.3-2 .2-2.9-.1 0-.1 0-.2 0Z" />
    <path d="M12.4 20.3c.3-.1.6-.3.9-.5 2.5-1.4 4-3.9 4-6.8 0-2.8-1.5-5-3.1-6.8-.7-.8-1.2-1.6-1.5-2.5-.1 1-.1 2.1-.3 3.2-.3 2-.7 4-.7 6 0 2.3.3 4.8.7 7.4Z" />
  </svg>
);

const PowerBILogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M5 18V9.5c0-.8.7-1.5 1.5-1.5h1C8.3 8 9 8.7 9 9.5V18" fill="currentColor" />
    <path d="M10 18V5.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5V18" fill="currentColor" opacity=".8" />
    <path d="M15 18V3.5c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5V18" fill="currentColor" opacity=".6" />
    <path d="M3 19.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FastAPILogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M13.5 2.5 5 13h5l-.8 8.5L18.5 11h-5l.0-8.5Z" fill="currentColor" />
  </svg>
);

const DjangoLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13.5 3h4v13.1c-1.4.4-3 .6-4.7.6-4.6 0-7.3-2.2-7.3-6.1 0-3.7 2.8-6.2 7.1-6.2.3 0 .6 0 .9.1V3Zm0 4.6c-.3-.1-.6-.1-1-.1-1.9 0-3 1.1-3 3s1.1 3 3 3c.4 0 .7 0 1-.1V7.6Z"
      fill="currentColor"
    />
    <path d="M18.5 4.5h2v12.7h-2V4.5Z" fill="currentColor" opacity=".7" />
  </svg>
);

const NumpyLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2.5 4.5 6.8v8.4l7.5 4.3 7.5-4.3V6.8L12 2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m7.5 8.5 4.5 2.6 4.5-2.6M12 11.1v5.4M7.5 8.5V14l4.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PandasLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 4v8M7 16v4M7 12h.01M12 3v4M12 10v11M12 7h.01M17 4v5M17 12v8M17 9h.01"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const TensorFlowLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="m7 8.5 5 2.8 5-2.8M12 11.3v6.2M12 6.2v5.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const RESTAPILogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 7h10M7 12h7M7 17h10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle cx="4" cy="7" r="1.2" fill="currentColor" />
    <circle cx="17" cy="12" r="1.2" fill="currentColor" />
    <circle cx="4" cy="17" r="1.2" fill="currentColor" />
  </svg>
);

const GitLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20.5 11.1 12.9 3.5a1.7 1.7 0 0 0-2.4 0L8.8 5.2l2.2 2.2a2 2 0 0 1 2.5 2.5l2.1 2.1a2 2 0 0 1 2.4 2.4 2 2 0 0 1-3.9-.7c0-.2 0-.4.1-.6l-2-2v5.2a2 2 0 1 1-1.5 0V11a2 2 0 0 1-1.1-1.1L7.5 7.8 3.5 11.8a1.7 1.7 0 0 0 0 2.4l7.6 7.6a1.7 1.7 0 0 0 2.4 0l7-7a1.7 1.7 0 0 0 0-2.4Z"
      fill="currentColor"
    />
  </svg>
);

const skills = [
  { label: "Next.js", icon: <NextJSLogo /> },
  { label: "React.js", icon: <ReactJSLogo /> },
  { label: "TypeScript", icon: <TypeScriptLogo /> },
  { label: "Tailwind CSS", icon: <TailwindLogo /> },
  { label: "Python", icon: <PythonLogo /> },
  { label: "PostgreSQL", icon: <PostgreSQLLogo /> },
  { label: "MongoDB", icon: <MongoDBLogo /> },
  { label: "REST API", icon: <RESTAPILogo /> },
  { label: "FastAPI", icon: <FastAPILogo /> },
  { label: "Django", icon: <DjangoLogo /> },
  { label: "Power BI", icon: <PowerBILogo /> },
  { label: "TensorFlow", icon: <TensorFlowLogo /> },
  { label: "NumPy", icon: <NumpyLogo /> },
  { label: "Pandas", icon: <PandasLogo /> },
  { label: "Git", icon: <GitLogo /> },
];

export function TechMarquee() {
  return (
    <div className="simple-tech-marquee-wrapper" aria-label="Technologies marquee">
      <div className="simple-tech-marquee-heading">
        <span>Selected capabilities</span>
        <span>Tech Stack</span>
      </div>
      <div className="simple-tech-marquee-track-container">
        <div className="simple-tech-marquee-track">
          {/* First set of pills */}
          <div className="simple-tech-marquee-group">
            {skills.map((skill) => (
              <div key={skill.label} className="simple-tech-pill">
                <span className="simple-tech-pill-icon">{skill.icon}</span>
                <span className="simple-tech-pill-label">{skill.label}</span>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless continuous looping */}
          <div className="simple-tech-marquee-group" aria-hidden="true">
            {skills.map((skill) => (
              <div key={`dup-${skill.label}`} className="simple-tech-pill">
                <span className="simple-tech-pill-icon">{skill.icon}</span>
                <span className="simple-tech-pill-label">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
