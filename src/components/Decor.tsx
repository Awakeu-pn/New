import type { CSSProperties } from "react";
import { Reveal } from "../lib/hooks";

/* Восьмилучевая звезда-астериск — фирменный знак */
export function Star({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="15" strokeLinecap="square">
        <line x1="50" y1="3" x2="50" y2="97" />
        <line x1="3" y1="50" x2="97" y2="50" />
        <line x1="16" y1="16" x2="84" y2="84" />
        <line x1="84" y1="16" x2="16" y2="84" />
      </g>
    </svg>
  );
}

/* Бегущая строка: содержимое дублируется для бесшовного цикла */
export function MarqueeBand({
  items,
  reverse = false,
  duration = 32,
  className = "",
  itemClassName = "",
  starClassName = "w-[0.55em] h-[0.55em] mx-[0.9em] text-flame",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  itemClassName?: string;
  starClassName?: string;
}) {
  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy === 1}>
      {items.map((it, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          <span>{it}</span>
          <Star className={starClassName} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? "rev" : ""}`}
        style={{ ["--marquee-dur" as string]: `${duration}s` }}
      >
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}

/* Вращающийся почтовый штемпель */
export function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <path
          id="stamp-circle"
          d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
        />
      </defs>
      <g className="spin-slower">
        <text fontSize="10" letterSpacing="2.6" fill="currentColor" fontWeight="700">
          <textPath href="#stamp-circle">
            ПРИВЕТ • МИР • ВСЕМ ПРИВЕТ • МИР •
          </textPath>
        </text>
      </g>
      <circle cx="60" cy="60" r="27" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="60"
        y="67"
        textAnchor="middle"
        fontSize="19"
        fontWeight="800"
        fill="currentColor"
        fontFamily="var(--font-display)"
      >
        ПМ
      </text>
    </svg>
  );
}

/* Заголовок раздела: [номер] + крупный титул + примечание */
export function SectionHead({
  index,
  title,
  note,
  tone = "light",
}: {
  index: string;
  title: string;
  note?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal>
      <div
        className={`mb-10 flex items-end justify-between gap-6 border-b-4 pb-4 md:mb-14 ${
          dark ? "border-paper" : "border-ink"
        }`}
      >
        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="font-display text-base font-extrabold text-flame md:text-2xl">
            [{index}]
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>
        {note && (
          <p
            className={`hidden max-w-xs text-right text-sm font-semibold md:block ${
              dark ? "text-paper/60" : "text-ink/55"
            }`}
          >
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}
