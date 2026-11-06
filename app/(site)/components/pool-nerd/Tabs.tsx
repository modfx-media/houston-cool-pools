"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

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

// Horizontal tabs are a swipeable row of numbered cards on phones (the active
// card points down at its panel) and a single pill bar from md up.
const HORIZONTAL = {
  list:
    "-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-2.5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
    "md:mx-0 md:inline-flex md:snap-none md:gap-1 md:overflow-visible md:rounded-full md:bg-white/80 md:p-1.5 md:ring-1 md:ring-[var(--color-navy-deep)]/10 md:shadow-[0_10px_30px_-20px_rgba(0,27,36,0.4)]",
  button:
    "flex min-h-[5.75rem] w-[10.5rem] snap-start flex-col justify-between rounded-2xl p-4 text-left ring-1 ring-[var(--color-navy-deep)]/10 shadow-[0_12px_28px_-22px_rgba(0,27,36,0.55)] " +
    "md:min-h-0 md:w-auto md:flex-row md:items-center md:rounded-full md:px-5 md:py-2.5 md:text-center md:whitespace-nowrap md:ring-0 md:shadow-none",
  idle: "bg-white md:bg-transparent",
  pill: "rounded-2xl md:rounded-full",
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
  const scroller = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState({ scrollable: false, start: true, end: false, progress: 0, visible: 1 });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el || vertical) return;
    const max = el.scrollWidth - el.clientWidth;
    setScroll({
      scrollable: max > 4,
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
      visible: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
    });
  }, [vertical]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const fade =
    scroll.scrollable && !vertical
      ? `linear-gradient(to right, ${scroll.start ? "#000" : "transparent"} 0, #000 28px, #000 calc(100% - 44px), ${
          scroll.end ? "#000" : "transparent"
        } 100%)`
      : undefined;

  const activate = (index: number) => {
    setActive(index);
    buttons.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    activate(next);
    buttons.current[next]?.focus({ preventScroll: true });
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
      <div
        ref={scroller}
        onScroll={measure}
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        style={fade ? { maskImage: fade, WebkitMaskImage: fade } : undefined}
        className={
          vertical
            ? `grid grid-cols-2 gap-1.5 rounded-[1.25rem] p-1.5 lg:flex lg:flex-col ${t.list}`
            : `${HORIZONTAL.list} md:![mask-image:none] md:![-webkit-mask-image:none]`
        }
      >
        {items.map((item, i) => {
          const selected = i === active;
          const count =
            item.count !== undefined ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${selected ? t.countActive : t.count}`}
              >
                {item.count}
              </span>
            ) : null;
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
              onClick={() => activate(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative shrink-0 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] ${
                vertical ? "min-h-11 rounded-xl px-4 py-2.5 text-left" : HORIZONTAL.button
              } ${selected ? t.active : `${t.idle} ${vertical ? "" : HORIZONTAL.idle}`}`}
            >
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className={`absolute inset-0 ${vertical ? "rounded-xl" : HORIZONTAL.pill} ${t.pill}`}
                  transition={{ duration: 0.45, ease }}
                >
                  {vertical ? null : (
                    <span
                      aria-hidden
                      className={`absolute -bottom-[7px] left-6 h-3.5 w-3.5 rotate-45 rounded-[3px] md:hidden ${t.pill}`}
                    />
                  )}
                </motion.span>
              ) : null}

              {vertical ? (
                <span className="relative flex items-center gap-2">
                  {item.label}
                  {count}
                </span>
              ) : (
                <>
                  <span className="relative flex items-center justify-between md:hidden">
                    <span
                      className={`text-[11px] font-semibold tracking-[0.2em] ${
                        selected ? "text-[var(--color-gold-light)]" : "text-[var(--color-pool)]"
                      }`}
                    >
                      {`0${i + 1}`}
                    </span>
                    {count}
                  </span>
                  <span className="relative mt-3 leading-snug md:mt-0 md:flex md:items-center md:gap-2">
                    {item.label}
                    <span className="hidden md:inline">{count}</span>
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {!vertical && scroll.scrollable ? (
        <div className="mt-1 flex items-center justify-between gap-4 md:hidden" aria-hidden>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-pool)]">
            {scroll.end ? (
              <>
                <motion.span
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  &larr;
                </motion.span>
                Swipe back
              </>
            ) : (
              <>
                Swipe for more
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  &rarr;
                </motion.span>
              </>
            )}
          </span>
          <span className="relative h-1 w-16 overflow-hidden rounded-full bg-[var(--color-navy-deep)]/10">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-pool)] transition-[transform] duration-150"
              style={{
                width: `${scroll.visible * 100}%`,
                transform: `translateX(${(scroll.progress * (1 - scroll.visible) * 100) / scroll.visible}%)`,
              }}
            />
          </span>
        </div>
      ) : null}

      <div className={vertical ? "" : "mt-6 md:mt-10"}>
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
