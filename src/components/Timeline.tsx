import { TIMELINE } from "../data/greetings";
import { Reveal } from "../lib/hooks";
import { SectionHead } from "./Decor";

export function Timeline() {
  return (
    <section id="story" className="relative border-b-[3px] border-ink bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHead
          index="03"
          title="Краткая история «привета»"
          note="От семитских пожеланий мира до голосовых сообщений"
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal from="left">
              <p className="font-display text-7xl font-black leading-[0.85] text-flame md:text-8xl">
                3 000
              </p>
              <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.2em]">
                лет — минимум
              </p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/70">
                ровно столько человечество целенаправленно здоровается. Форма
                меняется — жест остаётся: показать, что ты не опасен и рад встрече.
              </p>
              <div className="stripes-ink mt-8 h-5 w-40" aria-hidden="true" />
            </Reveal>
          </div>

          <ol className="relative ml-2 border-l-4 border-flame lg:col-span-8">
            {TIMELINE.map((t, i) => (
              <li key={t.title} className="relative pb-10 pl-7 last:pb-0 md:pl-10">
                <span
                  className="absolute -left-[13px] top-1.5 h-5 w-5 rotate-45 border-[3px] border-flame bg-ink"
                  aria-hidden="true"
                />
                <Reveal from="left" delay={i * 60}>
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-flame md:text-sm">
                    {t.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-extrabold uppercase tracking-tight md:text-3xl">
                    {t.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-ink/75">{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
