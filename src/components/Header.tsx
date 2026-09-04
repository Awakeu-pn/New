import { useClock, useTimeGreeting } from "../lib/hooks";
import { Star } from "./Decor";

const LINKS = [
  { href: "#atlas", label: "Атлас" },
  { href: "#postcard", label: "Открытка" },
  { href: "#story", label: "История" },
  { href: "#bye", label: "Пока" },
];

export function Header() {
  const clock = useClock();
  const timeGreeting = useTimeGreeting();

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center bg-flame text-paper transition-transform duration-300 group-hover:rotate-90">
            <Star className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-sm font-extrabold uppercase tracking-tight md:text-base">
            Привет·Мир
          </span>
          <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50 sm:block">
            атлас приветствий
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-wider md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="navlink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-bold uppercase tracking-widest text-ink/50 sm:block">
            {timeGreeting}
          </span>
          <span className="flex items-center gap-2 border-2 border-ink bg-ink px-2.5 py-1 text-xs font-bold text-paper tabular-nums">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
            </span>
            {clock}
          </span>
        </div>
      </div>
    </header>
  );
}
