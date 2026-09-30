import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="footer section-shell">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Built with intention in Dhaka</span>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}
