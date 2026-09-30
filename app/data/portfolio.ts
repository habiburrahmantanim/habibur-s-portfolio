export const profile = {
  name: "Habibur Rahman",
  role: "Web developer & data-minded builder",
  email: "tanim2612@gmail.com",
  github: "https://github.com/habiburrahmantanim",
  linkedin: "https://www.linkedin.com/in/habiburrahmantanim/",
  location: "Dhaka, Bangladesh",
};

export const skills = [
  "Next.js",
  "React.js",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "Django",
  "SQL",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Power BI",
];

export const projects = [
  {
    title: "OI-Truck",
    type: "Full-stack platform",
    description:
      "A truck booking and management platform with role-based dashboards, booking workflows, and delivery tracking.",
    tags: ["Next.js", "React", "REST API"],
    tone: "blue",
    metric: "Booking to delivery",
    href: profile.github,
  },
  {
    title: "ArchEagle",
    type: "Digital experience",
    description:
      "A modern architecture company website built around project galleries, service pages, and a mobile-first presentation.",
    tags: ["Next.js", "Tailwind", "SEO"],
    tone: "peach",
    metric: "Mobile-first",
    href: "https://github.com/habiburrahmantanim/ArchEagle",
  },
  {
    title: "Lung Cancer Classification",
    type: "Published research",
    description:
      "A deep learning pipeline classifying 691 histopathological images across seven lung cancer classes.",
    tags: ["Python", "CNN", "Transfer learning"],
    tone: "lime",
    metric: "94.6% accuracy",
    href: profile.github,
  },
  {
    title: "House Price Prediction",
    type: "Machine learning",
    description:
      "A regression study using feature engineering, Linear Regression, Random Forest, and RMSE/R2 evaluation.",
    tags: ["Pandas", "Scikit-learn", "Regression"],
    tone: "lavender",
    metric: "10,000+ records",
    href: profile.github,
  },
  {
    title: "Retail Sales Analytics",
    type: "Data analytics",
    description:
      "A Power BI reporting experience with dashboards and DAX measures for clearer retail performance decisions.",
    tags: ["Power BI", "DAX", "Data modeling"],
    tone: "yellow",
    metric: "5+ dashboards",
    href: profile.github,
  },
  {
    title: "Restaurant Website",
    type: "Frontend build",
    description:
      "A responsive restaurant frontend with reusable components and layouts designed for every screen size.",
    tags: ["React", "Next.js", "Responsive UI"],
    tone: "sky",
    metric: "Reusable system",
    href: profile.github,
  },
];

export const testimonials = [
  {
    quote:
      "Habibur brings a rare balance of careful implementation and curiosity. He makes complex product requirements feel approachable.",
    name: "Project collaborator",
    role: "Web development team",
  },
  {
    quote:
      "His strongest quality is ownership. He keeps refining the details until the interface feels clear and dependable.",
    name: "Internship mentor",
    role: "Object Canvas Technology",
  },
  {
    quote:
      "The research work shows the same mindset as the product work: structured thinking, iteration, and attention to evidence.",
    name: "Research perspective",
    role: "ECCT 2026 publication",
  },
];

export const journey = [
  {
    period: "2025",
    label: "Experience",
    title: "Web Development Intern",
    place: "Object Canvas Technology",
    description:
      "Built responsive interfaces and connected frontend workflows to REST APIs using React, Next.js, and Tailwind CSS.",
    tags: ["React.js", "Next.js", "REST APIs"],
  },
  {
    period: "2021 — 2025",
    label: "Education",
    title: "BSc in Computer Science & Engineering",
    place: "Green University of Bangladesh",
    description:
      "Developed a foundation across software engineering, databases, algorithms, and machine learning while building practical projects.",
    tags: ["Algorithms", "Python", "SQL"],
  },
  {
    period: "ECCT 2026",
    label: "Research",
    title: "Published deep learning research",
    place: "Conference proceedings",
    description:
      "Published work on histopathological lung cancer classification using an ensemble approach and advanced deep learning architectures.",
    tags: ["94.6% accuracy", "691 images", "7 classes"],
  },
];
