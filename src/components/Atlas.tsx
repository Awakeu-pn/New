import { useMemo, useState } from "react";
import { GREETINGS, REGIONS, type Greeting } from "../data/greetings";
import { Reveal } from "../lib/hooks";
import { SectionHead } from "./Decor";

export function Atlas({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (g: Greeting, scroll?: boolean) => void;
}) {
  const [region, setRegion] = useState<string>("Все");

  const list = useMemo(
    () => (region === "Все" ? GREETINGS : GREETINGS.filter((g) => g.region === region)),
    [region],
  );

  return (
    <section id="atlas" className="relative border-b-[3px] border-ink bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHead
          index="01"
          title="Атлас приветствий"
          note="Нажми на карточку — слово уедет прямиком в открытку ниже"
        />

        <Reveal delay={80}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {["Все", ...REGIONS].map((r) => {
                const active = region === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`border-2 border-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 md:text-xs ${
                      active
                        ? "bg-ink text-paper"
                        : "bg-transparent hover:bg-flame hover:text-paper"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-ink/50 tabular-nums">
              показано {list.length} из {GREETINGS.length}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g, i) => {
            const featured = g.id === "ru";
            const selected = g.id === selectedId;
            const num = GREETINGS.indexOf(g) + 1;
            return (
              <Reveal
                key={g.id}
                delay={(i % 3) * 70}
                className={featured ? "sm:col-span-2" : ""}
              >
                <button
                  onClick={() => onSelect(g, true)}
                  className={`group relative flex h-full w-full flex-col border-[3px] border-ink p-5 text-left transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 focus-visible:-translate-x-1 focus-visible:-translate-y-1 md:p-6 ${
                    featured
                      ? "bg-flame text-paper shadow-hard hover:shadow-hard"
                      : "bg-paper shadow-hard-sm hover:shadow-hard-flame"
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-xs font-bold opacity-60">
                      № {String(num).padStart(2, "0")}
                    </span>
                    <span className="border-2 border-current px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] md:text-[10px]">
                      {g.region}
                    </span>
                  </span>

                  <span
                    dir={g.dir}
                    className={`mt-4 font-display font-extrabold uppercase leading-[0.95] tracking-tight ${
                      featured ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {g.word}
                  </span>

                  <span className="mt-2.5 text-sm font-semibold opacity-70">
                    [{g.say}] · {g.speakers}
                  </span>

                  <span className="mt-4 text-sm font-extrabold uppercase tracking-wide">
                    {g.lang}
                  </span>
                  <span className="mt-1.5 text-sm leading-snug opacity-80">{g.fact}</span>

                  <span className="mt-auto flex items-center justify-between pt-5">
                    <span className="inline-flex translate-x-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform duration-200 group-hover:translate-x-1.5">
                      {selected ? "✓ уже в открытке" : "в открытку →"}
                    </span>
                    {selected && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest ${
                          featured ? "bg-ink text-paper" : "bg-flame text-paper"
                        }`}
                      >
                        выбрано
                      </span>
                    )}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
