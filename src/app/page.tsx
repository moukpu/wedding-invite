"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SakuraBranch from "@/components/SakuraBranch";
import SwallowBird from "@/components/SwallowBird";
import CraneBird from "@/components/CraneBird";
import PetalFall from "@/components/PetalFall";
import MountainSilhouette from "@/components/MountainSilhouette";

const WEDDING_DATE = new Date("2026-06-28T16:00:00");

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function useCountdown(targetDate: Date) {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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

  for (let day = 1; day <= daysInMonth; day++) {
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

  const calendarWeeks = generateCalendar(2026, 5); // June = month 5 (0-indexed)
  const dayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName && rsvpChoice) {
      setRsvpSubmitted(true);
    }
  };

  const dresscodeColors = [
    "#2d2d2d", "#5c4a3a", "#8b7355",
    "#c9a96e", "#d4b896", "#e8d5c0",
    "#f0e0d0", "#e8c4b8", "#d4a0a0",
    "#b8d4ce", "#a8c4b8", "#8aaa9e",
  ];

  if (!mounted) return null;

  return (
    <main className="max-w-[430px] mx-auto min-h-screen relative overflow-hidden bg-cream">
      {/* Watercolor background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden max-w-[430px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl from-rose/20 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-blush/15 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-56 h-56 rounded-full bg-gradient-to-tl from-gold/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-gradient-to-r from-rose/10 to-transparent blur-3xl" />
      </div>
      <PetalFall />

      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-48 opacity-40">
            <SakuraBranch flip />
          </div>
          <div className="absolute bottom-20 left-0 w-40 opacity-30">
            <SakuraBranch />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4 text-sm tracking-[0.3em] uppercase text-muted"
        >
          Прокрутите вниз
        </motion.div>

        <motion.div
          className="animate-scroll-bounce mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="mx-auto">
            <path d="M10 5 L10 20 M5 15 L10 20 L15 15" stroke="#c9a96e" strokeWidth="1.5" />
          </svg>
        </motion.div>

        <motion.h1
          className="font-cursive text-5xl sm:text-6xl text-dark mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Мы женимся!
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg tracking-[0.15em] uppercase text-dark/80 leading-relaxed max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          И хотим разделить с вами этот важный день!
        </motion.p>

        <motion.div
          className="absolute bottom-10 right-4 w-16 opacity-50"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <SwallowBird />
        </motion.div>
      </section>

      {/* Mountains between hero and invitation */}
      <div className="relative -mt-4 pointer-events-none opacity-60">
        <MountainSilhouette />
      </div>

      {/* === INVITATION SECTION === */}
      <AnimatedSection className="py-20 px-8 text-center relative">
        <div className="absolute top-4 right-0 w-32 opacity-25">
          <SakuraBranch flip />
        </div>

        <h2 className="font-cursive text-4xl text-dark mb-8">
          Дорогие друзья и родные!
        </h2>

        <div className="section-divider mb-8" />

        <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80 max-w-sm mx-auto">
          Приглашаем вас на торжество, посвященное нашему бракосочетанию.
        </p>
      </AnimatedSection>

      {/* === DATE & CALENDAR SECTION === */}
      <AnimatedSection className="py-16 px-8 text-center relative">
        <div className="absolute top-0 left-0 w-24 opacity-20">
          <SakuraBranch />
        </div>

        <motion.div
          className="absolute top-8 right-8 w-12"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <SwallowBird />
        </motion.div>

        <h2 className="font-cursive text-4xl text-dark mb-8">Дата</h2>

        <div className="section-divider mb-8" />

        <p className="text-sm tracking-[0.2em] uppercase mb-2">
          28 июня 2026 года
        </p>
        <p className="text-sm tracking-[0.2em] uppercase mb-10">Время 16:00</p>

        {/* Calendar Grid */}
        <div className="max-w-[280px] mx-auto">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((d) => (
              <div
                key={d}
                className="text-xs tracking-wider text-muted font-medium py-1"
              >
                {d}
              </div>
            ))}
          </div>
          {calendarWeeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`text-sm py-1.5 rounded-full transition-colors ${
                    day === 28
                      ? "bg-gold text-white font-semibold"
                      : day
                      ? "text-dark/70"
                      : ""
                  }`}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* === COUNTDOWN SECTION === */}
      <AnimatedSection className="py-20 px-8 text-center relative">
        <div className="absolute bottom-0 left-0 w-44 opacity-30">
          <SakuraBranch />
        </div>

        <motion.div
          className="absolute bottom-10 right-4 w-20"
          animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CraneBird />
        </motion.div>

        <h2 className="font-cursive text-4xl text-dark mb-10">
          До торжества
        </h2>

        <div className="section-divider mb-10" />

        <div className="flex justify-center items-start gap-2">
          {[
            { value: timeLeft.days, label: "дней" },
            { value: timeLeft.hours, label: "часов" },
            { value: timeLeft.minutes, label: "минут" },
            { value: timeLeft.seconds, label: "секунд" },
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center min-w-[50px]">
                <motion.span
                  key={item.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-light text-dark tabular-nums"
                >
                  {String(item.value).padStart(2, "0")}
                </motion.span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-muted mt-1">
                  {item.label}
                </span>
              </div>
              {i < 3 && (
                <span className="text-2xl text-gold/50 mt-0.5 mx-1">:</span>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Mountains between countdown and location */}
      <div className="relative pointer-events-none opacity-40">
        <MountainSilhouette />
      </div>

      {/* === LOCATION SECTION === */}
      <AnimatedSection className="py-20 px-8 text-center relative">
        <div className="absolute top-0 right-0 w-32 opacity-20">
          <SakuraBranch flip />
        </div>
        <div className="absolute top-4 left-4 w-16 opacity-30">
          <CraneBird className="scale-x-[-1]" />
        </div>

        <h2 className="font-cursive text-4xl text-dark mb-8">Локация</h2>

        <div className="section-divider mb-8" />

        <div className="mb-8">
          <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80">
            Город Алматы
          </p>
          <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80">
            ул. Абая, 52
          </p>
          <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80">
            Банкетный зал
          </p>
          <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80">
            &laquo;Royal Hall&raquo;
          </p>
        </div>

        <a
          href="https://2gis.kz/almaty/geo/9429940000768377"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gold/30 rounded-full px-6 py-3 text-sm tracking-wider uppercase text-dark hover:bg-gold/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#1DAD50" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              2G
            </text>
          </svg>
          Открыть карту
        </a>

        <div className="absolute bottom-0 left-0 w-36 opacity-25">
          <SakuraBranch />
        </div>
      </AnimatedSection>

      {/* === DRESSCODE SECTION === */}
      <AnimatedSection className="py-20 px-8 text-center relative">
        <div className="absolute top-8 right-0 w-24 opacity-20">
          <SakuraBranch flip />
        </div>

        <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80 max-w-xs mx-auto mb-8">
          Будем рады, если вы подчеркнёте палитру нашей свадьбы
        </p>

        <div className="section-divider mb-8" />

        <div className="flex flex-wrap justify-center gap-3 max-w-[280px] mx-auto">
          {dresscodeColors.map((color, i) => (
            <motion.div
              key={i}
              className="w-9 h-9 rounded-full border border-white/50 shadow-sm"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.2 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* === RSVP SECTION === */}
      <AnimatedSection className="py-20 px-8 text-center relative">
        <div className="absolute top-0 left-0 w-28 opacity-20">
          <SakuraBranch />
        </div>

        <h2 className="font-cursive text-4xl text-dark mb-8">Анкета</h2>

        <div className="section-divider mb-8" />

        <p className="text-sm tracking-[0.15em] uppercase leading-loose text-dark/80 mb-8">
          Подтвердите, пожалуйста, своё присутствие:
        </p>

        {rsvpSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gold/20"
          >
            <p className="font-cursive text-2xl text-dark mb-2">Спасибо!</p>
            <p className="text-sm text-muted">
              Ваш ответ принят. Мы будем рады видеть вас!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleRsvpSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Ваше имя"
                required
                className="w-full bg-white/60 backdrop-blur-sm border border-gold/20 rounded-lg px-4 py-3 text-sm tracking-wider text-dark placeholder:text-muted/60 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="space-y-3 text-left">
              {[
                { value: "yes", label: "Обязательно приду" },
                { value: "plus_one", label: "Приду с супругом/супругой" },
                { value: "no", label: "Не смогу присутствовать" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer group"
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
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      rsvpChoice === option.value
                        ? "border-gold bg-gold"
                        : "border-gold/30 group-hover:border-gold/60"
                    }`}
                  >
                    {rsvpChoice === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm tracking-wider uppercase text-dark/80">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={!rsvpName || !rsvpChoice}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-dark text-cream py-3.5 rounded-lg text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark/90"
            >
              Отправить
            </motion.button>
          </form>
        )}

        <div className="absolute bottom-4 right-0 w-32 opacity-20">
          <SakuraBranch flip />
        </div>

        <motion.div
          className="absolute bottom-20 right-8 w-12"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SwallowBird />
        </motion.div>
      </AnimatedSection>

      {/* === FOOTER === */}
      <section className="py-12 px-8 text-center">
        <div className="section-divider mb-6" />
        <p className="font-cursive text-3xl text-dark mb-2">
          Ринат & Динара
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-muted">
          28.06.2026
        </p>
      </section>
    </main>
  );
}
