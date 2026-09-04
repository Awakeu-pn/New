import { useEffect, useState } from "react";
import { HERO_WORDS, GREETINGS } from "../data/greetings";
import { Reveal, useClock, usePrefersReducedMotion, useScramble } from "../lib/hooks";
import { Star } from "./Decor";

const STATS: Array<{ value: string; label: string }> = [
  { value: String(GREETINGS.length), label: "языка в этом атласе" },
  { value: "6", label: "частей света — от Лиссабона до Окланда" },
  { value: "≈ 7 000", label: "живых языков на планете прямо сейчас" },
];

const ISSUE_LINKS = [
  { href: "#atlas", label: "Атлас приветствий" },
  { href: "#postcard", label: "Открытка на любом языке" },
  { href: "#story", label: "Краткая история «привета»" },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useClock();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIdx((v) => (v + 1) % HERO_WORDS.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const word = useScramble(HERO_WORDS[idx] ?? "ПРИВЕТ!");

  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-ink">
      <div className="absolute inset-0 bg-grid-ink" aria-hidden="true" />

      {/* красное солнце и орбита */}
      <div
        className="absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full border-4 border-ink bg-flame md:h-[500px] md:w-[500px]"
        aria-hidden="true"
      />
      <div
        className="absolute right-40 top-64 hidden h-36 w-36 rounded-full border-4 border-ink lg:block"
        aria-hidden="true"
      />
      <Star className="spin-slow absolute right-6 top-6 h-24 w-24 text-ink md:right-16 md:top-14 md:h-36 md:w-36" />

      {/* вертикальная подпись */}
      <div
        className="absolute left-5 top-1/2 hidden -translate-y-1/2 text-[11px] font-bold uppercase tracking-[0.4em] text-ink/45 xl:block"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        межъязыковой журнал — выпуск № 1
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <Reveal>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.25em] text-ink/70 md:text-xs">
            <span>Одно слово — {GREETINGS.length} способов его сказать</span>
            <span className="tabular-nums">местное время · {clock}</span>
          </div>
        </Reveal>

        <h1
          className="group mt-8 cursor-pointer select-none font-display text-[15vw] font-black uppercase leading-[0.92] tracking-tight md:mt-12 md:text-[11vw] lg:text-[9.5rem]"
          onClick={() => setIdx((v) => (v + 1) % HERO_WORDS.length)}
          title="Нажми — будет другое приветствие"
        >
          <span aria-live="polite">{word}</span>
          <span className="blink ml-2 inline-block h-[0.72em] w-[0.42em] translate-y-[0.06em] bg-flame transition-transform duration-200 group-hover:-rotate-6" />
        </h1>

        <Reveal delay={100}>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-ink/50 md:text-sm">
            ↑ слово меняется само — или по щелчку
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5" delay={120}>
            <p className="text-lg font-medium leading-relaxed md:text-xl">
              Каждое <span className="bg-flame px-1.5 font-extrabold text-paper">привет</span> —
              крошечный договор о мире. Два звука, а в них — «я тебя вижу, я к тебе без
              камня за пазухой». Этот атлас собирает первые слова планеты: как они звучат,
              откуда взялись и что значат на самом деле.
            </p>
          </Reveal>

          <Reveal className="md:col-span-3" delay={220}>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ink/50">
              в номере
            </p>
            <ul className="space-y-3">
              {ISSUE_LINKS.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group/link flex items-baseline gap-3 font-bold transition-transform duration-200 hover:translate-x-1.5"
                  >
                    <span className="font-display text-flame">
                      0{i + 1}
                    </span>
                    <span className="border-b-2 border-transparent group-hover/link:border-flame">
                      {l.label}
                    </span>
                    <span className="text-flame transition-transform duration-200 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4" delay={320}>
            <ul>
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline gap-4 border-t-[3px] border-ink py-3.5 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-3xl font-extrabold leading-none text-flame md:text-4xl">
                    {s.value}
                  </span>
                  <span className="text-sm font-semibold text-ink/70">{s.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="stripes-flame relative h-5 border-t-[3px] border-ink" aria-hidden="true" />
    </section>
  );
}
