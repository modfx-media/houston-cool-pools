import Image from "next/image";
import { Leaf, Wrench, Droplet } from "lucide-react";

const PROBLEMS = [
  {
    title: "Green or Cloudy Water",
    body: "Algae bloom, cloudy haze, or a swampy-looking pool after a storm or a stretch without service.",
    cause: "Usually low sanitizer, poor circulation, or a filter that's overdue for a clean.",
    icon: Leaf,
  },
  {
    title: "Equipment Not Working",
    body: "Pump won't prime, motor is loud or dead, or the salt cell has stopped producing chlorine.",
    cause: "Usually a worn impeller, a failing capacitor, or a cell that's reached the end of its life.",
    icon: Wrench,
  },
  {
    title: "Leaks & Water Loss",
    body: "Losing more than an inch a week, or noticing wet spots around equipment or decking.",
    cause: "Usually a cracked fitting, a failing skimmer or light niche seal, or a crack below the waterline.",
    icon: Droplet,
  },
];

export function ProblemStrip() {
  return (
    <section className="bg-[var(--color-pool-deep)] px-6 py-20 text-white md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
            Sound Familiar?
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-4xl">
            If your pool looks like this, we&rsquo;ve seen it a hundred times.
          </h2>

          <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
            {PROBLEMS.map((problem) => {
              const Icon = problem.icon;
              return (
                <div key={problem.title} className="flex gap-5 py-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[var(--color-gold-light)]">
                    <Icon className="h-5.5 w-5.5" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
                      {problem.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{problem.body}</p>
                    {problem.cause && (
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-gold-light)]/90">
                        {problem.cause}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:self-start">
          <Image
            src="/images/pool-maintenance/pool-maintenance-2.png"
            alt="Common pool maintenance problems Houston Cool Pools resolves"
            width={1536}
            height={1024}
            quality={95}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
