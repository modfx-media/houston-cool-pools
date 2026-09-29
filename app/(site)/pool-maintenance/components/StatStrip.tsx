import { CountUp } from "../../components/why-choose/CountUp";
import { BUSINESS } from "../../../../lib/business";

const YEARS_IN_BUSINESS =
  new Date().getFullYear() - Number(BUSINESS.foundingDate);

const STATS = [
  { value: YEARS_IN_BUSINESS, suffix: " Years", label: "Servicing Houston Pools" },
  { value: BUSINESS.areaServed.length, suffix: "", label: "Houston-Area Communities Served" },
  { value: 1, suffix: " Business Day", label: "Average Reply Time" },
];

export function StatStrip() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            className="font-[family-name:var(--font-display)] block text-4xl font-extrabold text-[var(--color-pool-deep)] md:text-5xl"
          />
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
