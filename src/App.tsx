import { useRef, useState } from "react";
import { BAND_WORDS, GREETINGS, type Greeting } from "./data/greetings";
import { usePrefersReducedMotion } from "./lib/hooks";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MarqueeBand } from "./components/Decor";
import { Atlas } from "./components/Atlas";
import { Playground } from "./components/Playground";
import { Timeline } from "./components/Timeline";
import { Footer } from "./components/Footer";

export default function App() {
  const [selectedId, setSelectedId] = useState("ru");
  const reduced = usePrefersReducedMotion();
  const postcardRef = useRef<HTMLDivElement>(null);

  const selected = GREETINGS.find((g) => g.id === selectedId) ?? GREETINGS[0]!;

  const handleSelect = (g: Greeting, scroll = false) => {
    setSelectedId(g.id);
    if (scroll) {
      postcardRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-paper font-body text-ink">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <MarqueeBand
          items={BAND_WORDS}
          className="border-b-[3px] border-ink bg-ink py-3.5 text-paper"
          itemClassName="font-display text-xl font-extrabold uppercase md:text-3xl"
          starClassName="w-[0.5em] h-[0.5em] mx-[0.8em] text-flame"
        />
        <Atlas selectedId={selectedId} onSelect={handleSelect} />
        <div ref={postcardRef}>
          <Playground greeting={selected} onSelect={(g) => handleSelect(g, false)} />
        </div>
        <Timeline />
      </main>
      <Footer />
    </div>
  );
}
