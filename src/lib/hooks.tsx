import { useEffect, useRef, useState, type ReactNode } from "react";

/* Предпочтение reduced motion — уважается всеми анимациями */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const SCRAMBLE_CHARS = "АВЕЖЗИКМНПРСТУХЦЧШЩЭЮЯ#*×+<>/\\";

function scrambleChar(ch: string): string {
  const cp = ch.codePointAt(0) ?? 65;
  // Иероглифику и прочие далёкие письменности не «ломаем» — они раскрываются как есть
  if (cp > 0x05ff) return ch;
  if (ch === " ") return " ";
  return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
}

/* Эффект «дешифровки»: текст собирается из случайных знаков слева направо */
export function useScramble(target: string, frameMs = 34): string {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(target);

  useEffect(() => {
    if (reduced) {
      setText(target);
      return;
    }
    const arr = Array.from(target);
    const totalFrames = Math.max(12, arr.length * 2);
    let frame = 0;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (now - last >= frameMs) {
        last = now;
        frame += 1;
        const resolved = Math.ceil((frame / totalFrames) * arr.length);
        if (resolved >= arr.length) {
          setText(target);
          return;
        }
        let out = "";
        arr.forEach((ch, i) => {
          out += i < resolved ? ch : scrambleChar(ch);
        });
        setText(out);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, frameMs]);

  return text;
}

/* Появление блока при прокрутке */
export function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "up" | "left" | "right";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-from={from}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* Живые часы HH:MM:SS */
export function useClock(): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString("ru-RU", { hour12: false });
}

/* Приветствие по времени суток */
export function useTimeGreeting(): string {
  const [hour, setHour] = useState(() => new Date().getHours());
  useEffect(() => {
    const id = window.setInterval(() => setHour(new Date().getHours()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (hour >= 5 && hour < 11) return "Доброе утро";
  if (hour >= 11 && hour < 17) return "Добрый день";
  if (hour >= 17 && hour < 23) return "Добрый вечер";
  return "Доброй ночи";
}
