import { useEffect, useState } from "react";
import { GOODBYES } from "../data/greetings";
import { usePrefersReducedMotion, useScramble } from "../lib/hooks";
import { MarqueeBand, Star } from "./Decor";

const FOOTER_WORDS = [
  "ПОКА!",
  "CIAO!",
  "ADÉU!",
  "TSCHÜSS!",
  "さようなら!",
  "AU REVOIR!",
  "再见!",
  "HASTA LUEGO!",
  "ДО ВСТРЕЧИ!",
];

const NAV = [
  { href: "#top", label: "На обложку" },
  { href: "#atlas", label: "Атлас приветствий" },
  { href: "#postcard", label: "Открытка" },
  { href: "#story", label: "История «привета»" },
];

export function Footer() {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIdx((v) => (v + 1) % FOOTER_WORDS.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const bye = useScramble(FOOTER_WORDS[idx] ?? "ПОКА!");

  return (
    <footer id="bye" className="relative overflow-hidden bg-ink text-paper">
      <MarqueeBand
        items={GOODBYES}
        reverse
        duration={38}
        className="border-y-[3px] border-ink bg-flame py-3 text-ink"
        itemClassName="font-display text-2xl font-extrabold uppercase md:text-4xl"
        starClassName="w-[0.5em] h-[0.5em] mx-[0.8em] text-ink"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-12 md:px-6 md:py-20">
        <div className="md:col-span-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-paper/50">
            на этом выпуск № 1 закончен
          </p>
          <p className="mt-4 min-h-[1.2em] font-display text-6xl font-black uppercase leading-none tracking-tight md:text-8xl">
            {bye}
          </p>
          <p className="mt-5 max-w-sm leading-relaxed text-paper/60">
            Прощание — это приветствие наоборот: тот же жест мира, только с обещанием
            повторить. До следующего выпуска.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-paper/50">
            разделы
          </p>
          <ul className="mt-4 space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group inline-flex items-center gap-2 font-bold transition-colors hover:text-flame"
                >
                  <span className="text-flame transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-paper/50">
            колонка редактора
          </p>
          <p className="mt-4 text-sm leading-relaxed text-paper/60">
            Атлас собран из любви к первым словам. Источники: словари, телефонные книги
            1878 года и бабушки, которые до сих пор спрашивают, поел ли ты.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-paper/45">
            <Star className="h-3.5 w-3.5 text-flame" />
            шрифты: Unbounded и Manrope
          </p>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-paper/45 md:px-6">
          <span>© 2026 Привет, мир</span>
          <span className="hidden md:block">сделано для всех, кто здоровается первым</span>
          <a href="#top" className="navlink text-paper/70 hover:text-paper">
            наверх ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
