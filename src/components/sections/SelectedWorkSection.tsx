import { DeckleRule } from "@/components/paper/DeckleRule";
import { LINKS } from "@/lib/links";

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  url: string;
  displayUrl: string;
  accent: string;
  badge: string;
  description: string;
  highlights: string[];
}

const SELECTED_PROJECTS: WorkItem[] = [
  {
    id: "crowd-management",
    title: "Crowd Management Platform",
    subtitle: "PRAVAAH Spatial Control Engine",
    category: "Real-Time Capacity & Safety System",
    url: LINKS.crowdManagement,
    displayUrl: "crowdmanagement-omega.vercel.app",
    accent: "var(--pig-indigo)",
    badge: "Live Deployment",
    description:
      "A real-time crowd safety and spatial capacity orchestration engine. Continuous accounting of physical capacity across transit, dining, resting, and sacred gathering zones with atomic journey contract distribution.",
    highlights: [
      "Real-Time Resource Accounting",
      "Atomic Journey Contracts",
      "Temporal Horizon Spreading",
      "Live Vercel Infrastructure",
    ],
  },
  {
    id: "job-portal",
    title: "Career Vistaa — Job Portal",
    subtitle: "Career & Talent Discovery Engine",
    category: "Employment & Recruitment Platform",
    url: LINKS.jobPortal,
    displayUrl: "careervistaa-eta.vercel.app",
    accent: "var(--pig-clay)",
    badge: "Live Deployment",
    description:
      "A comprehensive job portal designed for modern hiring workflows. Features candidate discovery, streamlined application pipelines, role recommendations, and responsive recruitment analytics.",
    highlights: [
      "Intuitive Job & Candidate Search",
      "Application Lifecycle Tracking",
      "Dynamic Career Dashboard",
      "Live Vercel Infrastructure",
    ],
  },
];

export function SelectedWorkSection() {
  return (
    <section id="selected-work" className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      <DeckleRule className="mb-12" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="type-text text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted mb-2">
            05 · Featured Projects & Deployments
          </p>
          <h2 className="type-display letterpress ink-bleed text-2xl sm:text-3xl text-ink leading-tight">
            Selected Work
          </h2>
        </div>
        <p className="type-text text-sm text-ink-soft max-w-md leading-relaxed">
          Production applications and live platforms engineered for high performance, spatial safety, and intuitive user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SELECTED_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="pv-contract rounded-sm border border-rule/55 bg-page/80 p-6 sm:p-7 relative flex flex-col justify-between transition-all duration-300 hover:border-rule hover:shadow-sm group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className="type-text text-[0.58rem] uppercase tracking-[0.22em] font-medium"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 type-text text-[0.52rem] uppercase tracking-[0.18em] text-ink border border-rule/60 px-2.5 py-0.5 rounded-[2px] bg-page/90">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
                  {project.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="type-display text-xl sm:text-2xl text-ink mb-1 group-hover:text-ink-body transition-colors">
                {project.title}
              </h3>
              <p className="type-text text-xs text-ink-muted mb-4 font-mono">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="type-text text-sm text-ink-soft leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-6 pt-4 border-t border-rule/30">
                <p className="type-text text-[0.55rem] uppercase tracking-[0.2em] text-ink-muted mb-3">
                  Key Capabilities
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 type-text text-xs text-ink-body">
                      <span className="text-ink-muted text-[0.6rem]">❖</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions & Link Footer */}
            <div className="pt-5 border-t border-rule/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="type-text text-xs text-ink-muted truncate font-mono text-[0.7rem]">
                {project.displayUrl}
              </span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pv-chip inline-flex items-center justify-center gap-2 type-text text-[0.64rem] uppercase tracking-[0.22em] text-ink bg-page/90 border border-rule/70 hover:border-ink hover:bg-ink hover:text-page px-4 py-2 rounded-sm transition-all shrink-0 font-medium"
              >
                <span>Launch App</span>
                <svg
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
