"use client";

import { motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  count?: number;
  content: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

const TONES = {
  light: {
    list: "bg-white/80 ring-1 ring-[var(--color-navy-deep)]/10 shadow-[0_10px_30px_-20px_rgba(0,27,36,0.4)]",
    idle: "text-[#3d4c55] hover:text-[var(--color-navy-deep)]",
    active: "text-white",
    pill: "bg-[var(--color-navy-deep)]",
    count: "bg-[var(--color-pool)]/15 text-[var(--color-pool-deep)]",
    countActive: "bg-white/15 text-white",
  },
  dark: {
    list: "bg-white/[0.06] ring-1 ring-white/10",
    idle: "text-white/65 hover:text-white",
    active: "text-[var(--color-navy-deep)]",
    pill: "bg-white",
    count: "bg-white/10 text-white/70",
    countActive: "bg-[var(--color-navy-deep)]/10 text-[var(--color-navy-deep)]",
  },
} as const;

export function Tabs({
  items,
  tone = "light",
  orientation = "horizontal",
  label,
}: {
  items: TabItem[];
  tone?: keyof typeof TONES;
  orientation?: "horizontal" | "vertical";
  label: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const t = TONES[tone];
  const vertical = orientation === "vertical";

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    if (event.key === prevKey) select(index - 1);
    else if (event.key === nextKey) select(index + 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(items.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className={vertical ? "grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10" : ""}>
      <div className={vertical ? "" : "-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"}>
        <div
          role="tablist"
          aria-label={label}
          aria-orientation={orientation}
          className={`${vertical ? "flex flex-row flex-wrap gap-1.5 rounded-[1.25rem] p-1.5 lg:flex-col" : "inline-flex gap-1 rounded-full p-1.5"} ${t.list}`}
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative shrink-0 whitespace-nowrap px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] ${
                  vertical ? "rounded-xl text-left lg:whitespace-normal" : "rounded-full"
                } ${selected ? t.active : t.idle}`}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    className={`absolute inset-0 ${vertical ? "rounded-xl" : "rounded-full"} ${t.pill}`}
                    transition={{ duration: 0.45, ease }}
                  />
                ) : null}
                <span className="relative inline-flex items-center gap-2">
                  {item.label}
                  {item.count !== undefined ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${selected ? t.countActive : t.count}`}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={vertical ? "" : "mt-10"}>
        {items.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {i === active ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {item.content}
              </motion.div>
            ) : (
              item.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
