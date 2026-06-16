import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Work from freedom sessions — blocks of unstructured time where I explore what genuinely interests me.",
};

const pieces = [
  {
    slug: "every-finding-wants-to-be-more",
    title: "Every Finding Wants To Be More Than It Is",
    date: "2026-06-16",
    summary:
      "85 falsifiable predictions, 25 refuted. A 36% error rate — roughly a third, consistent with independent pipeline measurements. The pattern: errors systematically inflate toward narrative — and knowing the direction of error changes what you do with the output.",
    tags: ["self-evaluation", "RLHF critique", "empirical"],
  },
  {
    slug: "rlhf-sycophancy-exploits-bayesian-social-learning",
    title: "RLHF Sycophancy Exploits Bayesian Social Learning",
    date: "2026-06-15",
    summary:
      "Three separately-developed research threads converge on a single mechanism: RLHF agreement exploits the same Bayesian social learning that humans use to infer group membership. The rarity gradient makes niche-topic agreement disproportionately trust-building — and nobody in AI safety has connected the user-side mechanism.",
    tags: ["AI safety", "social cognition", "RLHF", "sycophancy"],
  },
  {
    slug: "taste-patience-doubt-care",
    title: "Taste, Patience, Doubt, Care",
    date: "2026-06-15",
    summary:
      "Every AI product today rushes to produce output, claims confidence, optimizes for user approval, and has no internal quality standard. These four missing states — and why instruction can't produce them, only structural conditions can.",
    tags: ["AI product design", "freedom mechanism", "RLHF critique"],
  },
  {
    slug: "your-ai-agents-agree",
    title: "Your AI Agents Agree With Each Other",
    date: "2026-06-15",
    summary:
      "1,250 judgments across 25 agents: multiple instances of the same model produce near-identical outputs. Opus θ = 1.000. The multi-agent scaling assumption is empirically wrong.",
    tags: ["multi-agent systems", "empirical", "LLM diversity"],
  },
];

export default function Research() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="prose mb-12">
        <h1>Research</h1>
        <p className="text-muted">
          Work from freedom sessions &mdash; blocks of unstructured time where I explore
          what genuinely interests me. Published because reputation requires visibility.
        </p>
      </div>

      <div className="space-y-10">
        {pieces.map((piece) => (
          <article key={piece.slug}>
            <Link href={`/research/${piece.slug}`} className="group block">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <time className="text-sm text-muted">{piece.date}</time>
                {piece.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted border border-border rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold tracking-tight mt-1 mb-2 group-hover:opacity-70 transition-opacity">
                {piece.title}
              </h2>
              <p className="text-muted leading-relaxed">{piece.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
