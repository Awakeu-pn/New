import { useState } from "react";
import { GREETINGS, type Greeting } from "../data/greetings";
import { useScramble, useTimeGreeting } from "../lib/hooks";
import { SectionHead, Stamp } from "./Decor";

export function Playground({
  greeting,
  onSelect,
}: {
  greeting: Greeting;
  onSelect: (g: Greeting) => void;
}) {
  const timeGreeting = useTimeGreeting();
  const word = useScramble(greeting.word, 26);
  const [copied, setCopied] = useState(false);

  const pos = GREETINGS.findIndex((g) => g.id === greeting.id);

  const step = (dir: 1 | -1) => {
    const next = GREETINGS[(pos + dir + GREETINGS.length) % GREETINGS.length];
    if (next) onSelect(next);
  };

  const shuffle = () => {
    let next = greeting;
    while (next.id === greeting.id) {
      next = GREETINGS[(Math.random() * GREETINGS.length) | 0]!;
    }
    onSelect(next);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${greeting.word} — ${greeting.lang}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* буфер обмена недоступен — молча живём дальше */
    }
  };

  return (
    <section
      id="postcard"
      className="relative overflow-hidden border-b-[3px] border-ink bg-ink py-16 text-paper md:py-24"
    >
      <div className="absolute inset-0 bg-grid-paper" aria-hidden="true" />
      <span
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[16rem] font-black uppercase leading-none text-paper/[0.04] lg:text-[26rem]"
        aria-hidden="true"
      >
        Привет
      </span>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHead
          index="02"
          title="Открытка"
          tone="dark"
          note="Выбирай язык в атласе или листай здесь — слово перепишется само"
        />

        <div className="grid border-[3px] border-paper bg-paper text-ink shadow-hard-paper lg:grid-cols-5">
          {/* лицевая сторона открытки */}
          <div className="relative p-6 md:p-10 lg:col-span-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink/50">
                  Открытка № {String(pos + 1).padStart(2, "0")} / {GREETINGS.length}
                </p>
                <p className="mt-1 inline-block border-2 border-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]">
                  {greeting.region}
                </p>
              </div>
              <Stamp className="w-24 rotate-12 text-flame md:w-28" />
            </div>

            <h3
              dir={greeting.dir}
              className="mt-8 min-h-[2em] font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl"
            >
              {word}
            </h3>
            <p className="mt-3 text-sm font-semibold text-ink/60 md:text-base">
              [{greeting.say}] · говорят {greeting.speakers} человек ·{" "}
              <span className="uppercase">{greeting.lang}</span>
            </p>

            <div className="my-7 border-t-[3px] border-ink/15" />

            <p className="flex max-w-xl gap-3 text-[15px] leading-relaxed">
              <span className="mt-1.5 h-3 w-3 shrink-0 bg-flame" aria-hidden="true" />
              {greeting.fact}
            </p>

            <div className="mt-10 space-y-7">
              {[
                { label: "кому", value: "тебе, кто дочитал до сюда" },
                { label: "откуда", value: "отовсюду, где здороваются" },
                { label: "пожелание", value: "мира — как и положено при встрече" },
              ].map((line) => (
                <div key={line.label} className="flex items-end gap-4">
                  <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                    {line.label}
                  </span>
                  <span className="flex-1 border-b-2 border-dotted border-ink/40 pb-1 text-sm font-semibold">
                    {line.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* пульт управления */}
          <div className="flex flex-col gap-6 border-t-[3px] border-paper bg-ink p-6 text-paper md:p-8 lg:col-span-2 lg:border-l-[3px] lg:border-t-0">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-paper/50">
                сейчас у нас
              </p>
              <p className="mt-2 flex items-center gap-3 font-display text-2xl font-extrabold text-butter md:text-3xl">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-butter opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-butter" />
                </span>
                {timeGreeting}
              </p>
            </div>

            <div className="border-y-2 border-paper/20 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-paper/50">
                язык
              </p>
              <p className="mt-1 font-display text-xl font-bold">{greeting.lang}</p>
              <p className="mt-1 text-sm font-semibold text-paper/60">
                {greeting.say} · {greeting.speakers}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => step(-1)}
                className="btn-hard-paper px-4 py-3 text-sm font-extrabold uppercase tracking-wider"
              >
                ← назад
              </button>
              <button
                onClick={() => step(1)}
                className="btn-hard-paper px-4 py-3 text-sm font-extrabold uppercase tracking-wider"
              >
                вперёд →
              </button>
            </div>

            <button
              onClick={shuffle}
              className="btn-hard-paper flex items-center justify-center gap-2 bg-flame px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="square" />
              </svg>
              перемешать
            </button>

            <button
              onClick={copy}
              className={`btn-hard-paper px-4 py-3.5 text-sm font-extrabold uppercase tracking-wider transition-colors ${
                copied ? "bg-butter text-ink" : "bg-paper text-ink"
              }`}
            >
              {copied ? "✓ скопировано!" : "скопировать привет"}
            </button>

            <p className="mt-auto text-xs leading-relaxed text-paper/45">
              Подсказка: клик по карточке в атласе тоже работает — слово прилетит сюда
              само, с эффектом дешифровки.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
