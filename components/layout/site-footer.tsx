import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/face-makeup", label: "Face Makeup" },
      { href: "/eye-makeup", label: "Eye Makeup" },
      { href: "/lip-makeup", label: "Lip Makeup" },
      { href: "/makeup", label: "Makeup Hub" },
      { href: "/try-on", label: "Look Try On" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Makeup Guides" },
      { href: "/makeup-looks", label: "Popular Makeup Looks" },
      { href: "/makeup-looks-by-face-shape", label: "Makeup by Face Shape" },
      { href: "/cat-face-makeup", label: "Cat Face Makeup" },
      { href: "/tools", label: "Beauty Tools" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <BrandLogo size="lg" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--foreground-muted)]">
            Makeup how-tos and tools from MakeUp Face Ai. On-device face mapping,
            placement tips, and routines built around your features.
          </p>
          <div className="mt-5 flex gap-4 text-sm text-[var(--foreground-muted)]">
            <a href="https://instagram.com" className="hover:text-[var(--dusty-rose)]" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://pinterest.com" className="hover:text-[var(--dusty-rose)]" aria-label="Pinterest">
              Pinterest
            </a>
            <a href="https://youtube.com" className="hover:text-[var(--dusty-rose)]" aria-label="YouTube">
              YouTube
            </a>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--dusty-rose)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border)] px-4 py-5 text-center text-xs text-[var(--foreground-muted)]">
        © 2026 MakeUp Face Ai. Makeup education only, not medical advice.
      </div>
    </footer>
  );
}
