"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const WEDDING_DATE = new Date("2026-06-28T16:00:00");

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function useCountdown(targetDate: Date) {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calcTimeLeft]);

  return timeLeft;
}

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return weeks;
}

export default function Home() {
  const timeLeft = useCountdown(WEDDING_DATE);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpChoice, setRsvpChoice] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const calendarWeeks = generateCalendar(2026, 5);
  const dayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const dresscodeColors = [
    "#2d2d2d",
    "#5c4a3a",
    "#8b7355",
    "#c9a96e",
    "#d4b896",
    "#e8d5c0",
    "#f0e0d0",
    "#e8c4b8",
    "#d4a0a0",
    "#b8d4ce",
    "#a8c4b8",
    "#8aaa9e",
  ];

  const handleRsvpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rsvpName && rsvpChoice) setRsvpSubmitted(true);
  };

  if (!mounted) return null;

  return (
    <main className="invite-page mx-auto min-h-screen max-w-[430px] overflow-hidden bg-cream text-dark">
      <div className="pointer-events-none fixed inset-0 mx-auto max-w-[430px] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 opacity-50">
          <Image
            src="/images/mountains-subtle.png"
            alt=""
            width={1568}
            height={856}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0.86),rgba(250,246,241,0.52),rgba(250,246,241,0.86))]" />
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-7 pb-16 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-[11px] uppercase tracking-[0.35em] text-muted"
        >
          Прокрутите вниз
        </motion.div>

        <motion.div
          className="animate-scroll-bounce mb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <svg width="18" height="28" viewBox="0 0 20 30" fill="none" className="mx-auto">
            <path d="M10 5 L10 20 M5 15 L10 20 L15 15" stroke="#c9a96e" strokeWidth="1.35" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.35 }}
          className="relative z-10"
        >
          <h1 className="font-cursive text-[53px] leading-none text-dark">Мы женимся!</h1>
          <p className="mx-auto mt-5 max-w-[250px] text-[14px] uppercase tracking-[0.16em] text-dark/80">
            И хотим разделить с вами этот важный день!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="pointer-events-none absolute right-0 top-0 w-[78%] opacity-92"
        >
          <Image src="/images/sakura-top.png" alt="" width={1536} height={1024} className="h-auto w-full" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="pointer-events-none absolute bottom-6 left-0 w-[82%] opacity-95"
        >
          <Image src="/images/sakura-bottom.png" alt="" width={1536} height={1024} className="h-auto w-full" priority />
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="pointer-events-none absolute right-7 top-[12%] w-[84px] opacity-90"
        >
          <Image src="/images/swallow.png" alt="" width={1536} height={1536} className="h-auto w-full" priority />
        </motion.div>
      </section>

      <AnimatedSection className="relative mt-16 px-8 pb-16 pt-12 text-center">
        <h2 className="font-cursive text-[44px] leading-none text-dark">Дорогие друзья и родные!</h2>
        <div className="section-divider mb-8 mt-7" />
        <p className="mx-auto max-w-[310px] text-[13px] uppercase leading-[2.1] tracking-[0.15em] text-dark/80">
          Приглашаем вас на торжество, посвященное нашему бракосочетанию.
        </p>
      </AnimatedSection>

      <AnimatedSection className="relative mt-16 px-8 py-16 text-center">
        <div className="pointer-events-none absolute right-4 top-2 w-[66px] opacity-90">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Image src="/images/swallow.png" alt="" width={1536} height={1536} className="h-auto w-full" />
          </motion.div>
        </div>

        <h2 className="font-cursive text-[42px] leading-none text-dark">Дата</h2>
        <div className="section-divider mb-8 mt-6" />

        <p className="text-[12px] uppercase tracking-[0.24em] text-dark/80">28 июня 2026 года</p>
        <p className="mb-10 mt-2 text-[12px] uppercase tracking-[0.24em] text-dark/80">Время 16:00</p>

        <div className="mx-auto max-w-[282px]">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="py-1 text-[10px] font-medium tracking-[0.14em] text-muted">
                {day}
              </div>
            ))}
          </div>
          {calendarWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`rounded-full py-1.5 text-[14px] ${
                    day === 28 ? "bg-gold font-semibold text-white" : day ? "text-dark/70" : ""
                  }`}
                >
                  {day ?? ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative mt-16 px-8 py-16 text-center">
        <div className="pointer-events-none absolute bottom-2 left-0 w-[96px] opacity-92">
          <Image src="/images/crane.png" alt="" width={1536} height={1024} className="h-auto w-full" />
        </div>

        <h2 className="font-cursive text-[42px] leading-none text-dark">До торжества</h2>
        <div className="section-divider mb-10 mt-6" />

        <div className="flex justify-center gap-2">
          {[
            { value: timeLeft.days, label: "дней" },
            { value: timeLeft.hours, label: "часов" },
            { value: timeLeft.minutes, label: "минут" },
            { value: timeLeft.seconds, label: "секунд" },
          ].map((item, index) => (
            <div key={item.label} className="flex items-start">
              <div className="flex min-w-[54px] flex-col items-center">
                <motion.span
                  key={item.value}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  className="text-[35px] font-light leading-none tabular-nums text-dark"
                >
                  {String(item.value).padStart(2, "0")}
                </motion.span>
                <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-muted">{item.label}</span>
              </div>
              {index < 3 && <span className="mx-1 mt-1 text-2xl text-gold/50">:</span>}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative mt-16 px-8 py-16 text-center">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-38">
          <Image src="/images/mountains-landscape.png" alt="" width={1536} height={1024} className="h-auto w-full" />
        </div>

        <h2 className="relative z-10 font-cursive text-[42px] leading-none text-dark">Локация</h2>
        <div className="section-divider relative z-10 mb-8 mt-6" />

        <div className="relative z-10 mb-8 space-y-2 text-[13px] uppercase tracking-[0.16em] text-dark/80">
          <p>Город Алматы</p>
          <p>ул. Абая, 52</p>
          <p>Банкетный зал</p>
          <p>&laquo;Royal Hall&raquo;</p>
        </div>

        <a
          href="https://2gis.kz/almaty/geo/9429940000768377"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-white/75 px-6 py-3 text-[12px] uppercase tracking-[0.16em] text-dark backdrop-blur-sm transition-colors hover:bg-white/90"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#1DAD50" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
              2G
            </text>
          </svg>
          Открыть карту
        </a>
      </AnimatedSection>

      <AnimatedSection className="relative mt-16 px-8 py-16 text-center">
        <p className="mx-auto mb-8 max-w-[260px] text-[12px] uppercase leading-[2] tracking-[0.15em] text-dark/80">
          Будем рады, если вы подчеркнёте палитру нашей свадьбы
        </p>
        <div className="section-divider mb-8" />

        <div className="mx-auto flex max-w-[290px] flex-wrap justify-center gap-3">
          {dresscodeColors.map((color, index) => (
            <motion.div
              key={color}
              className="h-9 w-9 rounded-full border border-white/60 shadow-sm"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative mt-16 px-8 pb-20 pt-16 text-center">
        <div className="pointer-events-none absolute left-0 top-0 w-[78%] opacity-90">
          <Image src="/images/sakura-bottom.png" alt="" width={1536} height={1024} className="h-auto w-full scale-x-[-1] opacity-70" />
        </div>

        <div className="pointer-events-none absolute bottom-10 right-4 w-[62px] opacity-90">
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Image src="/images/swallow.png" alt="" width={1536} height={1536} className="h-auto w-full" />
          </motion.div>
        </div>

        <h2 className="relative z-10 font-cursive text-[42px] leading-none text-dark">Анкета</h2>
        <div className="section-divider relative z-10 mb-8 mt-6" />

        <p className="relative z-10 mb-8 text-[12px] uppercase leading-[2] tracking-[0.15em] text-dark/80">
          Подтвердите, пожалуйста, своё присутствие:
        </p>

        {rsvpSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 rounded-[26px] border border-gold/20 bg-white/65 p-8 backdrop-blur-sm"
          >
            <p className="font-cursive text-[34px] text-dark">Спасибо!</p>
            <p className="mt-2 text-[13px] text-muted">Ваш ответ принят. Мы будем рады видеть вас!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleRsvpSubmit} className="relative z-10 space-y-5">
            <input
              type="text"
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
              placeholder="Ваше имя"
              required
              className="w-full rounded-xl border border-gold/20 bg-white/65 px-4 py-3 text-[13px] tracking-[0.12em] text-dark placeholder:text-muted/60 backdrop-blur-sm outline-none transition-colors focus:border-gold/50"
            />

            <div className="space-y-3 text-left">
              {[
                { value: "yes", label: "Обязательно приду" },
                { value: "plus_one", label: "Приду с супругом/супругой" },
                { value: "no", label: "Не смогу присутствовать" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => setRsvpChoice(option.value)}
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value={option.value}
                    checked={rsvpChoice === option.value}
                    onChange={() => setRsvpChoice(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      rsvpChoice === option.value ? "border-gold bg-gold" : "border-gold/30"
                    }`}
                  >
                    {rsvpChoice === option.value && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-dark/80">{option.label}</span>
                </label>
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={!rsvpName || !rsvpChoice}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-dark py-3.5 text-[12px] uppercase tracking-[0.2em] text-cream transition-all disabled:cursor-not-allowed disabled:opacity-40"
            >
              Отправить
            </motion.button>
          </form>
        )}
      </AnimatedSection>

      <section className="mt-12 px-8 pb-12 pt-6 text-center">
        <div className="section-divider mb-6" />
        <p className="font-cursive text-[38px] leading-none text-dark">Ринат & Динара</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-muted">28.06.2026</p>
      </section>
    </main>
  );
}
