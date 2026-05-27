"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    let frameId: number | null = null;
    const targetDate = new Date("2026-06-28T16:00:00").getTime();

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    frameId = requestAnimationFrame(() => {
      setIsMounted(true);
      setTimeLeft(calculateTimeLeft());
    });

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      clearInterval(timer);
    };
  }, []);

  const calendarWeeks = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, null, null, null, null, null],
  ];

  return (
    <>
      {/* Static Background - Mountains (outside main so fixed works with scroll) */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[65vh] overflow-hidden z-0">
        <Image
          src="/images/mountains-landscape.png"
          alt="Watercolor mountains background"
          fill
          className="object-cover object-center scale-[1.08]"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0)_20%,rgba(250,246,241,1)_100%)]" />
      </div>

      <main className="invite-page min-h-screen bg-cream/80 relative overflow-hidden">
        {/* Аудио плеер (скрытый) */}
        <audio ref={audioRef} src="/audio/song.mp3" loop />

        {/* Hero Section Container */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-between pt-32 pb-16 px-6 text-center z-10">
          
          {/* Sakura Branch - positioned in the upper-left, extending horizontally, transparent background */}
          <div className="absolute left-0 top-0 w-[80%] max-w-[340px] pointer-events-none z-20 select-none">
            <Image
              src="/images/sakura-top.png"
              alt="Sakura branch"
              width={920}
              height={520}
              className="h-auto w-full object-contain origin-top-left"
              priority
            />
          </div>

          {/* Flying Swallow Bird - slightly enlarged and shifted right to be separate from the branch */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="absolute right-[12px] top-[75px] w-[90px] pointer-events-none z-20 select-none"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                x: [0, 3, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image
                src="/images/swallow.png"
                alt="Flying swallow bird"
                width={636}
                height={558}
                className="h-auto w-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Spacer for top illustrations */}
          <div className="h-[220px]" />

          {/* Couple Names - Styled exactly like photo 3 with a giant light ampersand in the background */}
          <div className="relative flex flex-col items-center justify-center my-auto -mt-12 w-full max-w-[320px] z-30">
            {/* Giant decorative ampersand in the background */}
            <span className="font-cursive text-[180px] font-thin text-gold/15 absolute select-none pointer-events-none z-0 mt-6">
              &
            </span>
            
            {/* Names offset for elegant calligraphic composition */}
            <div className="relative z-10 flex flex-col items-center w-full select-none">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-cursive text-[76px] text-dark leading-none -translate-x-[45px] -translate-y-[35px]"
              >
                Ринат
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-cursive text-[76px] text-dark leading-none translate-x-[90px] translate-y-[50px] mt-[158px]"
              >
                Динара
              </motion.span>
            </div>
          </div>

          {/* Bottom Decorations - sakura branch from right, crane flying left */}
          <div className="relative w-full h-[300px] mt-8">
            {/* Bottom Sakura Branch - extending from right side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.8 }}
              className="absolute right-0 top-0 w-[75%] max-w-[340px] pointer-events-none z-20 select-none"
            >
              <Image
                src="/images/sakura-bottom.png"
                alt="Sakura branch bottom"
                width={1024}
                height={764}
                className="h-auto w-full object-contain origin-top-right"
              />
            </motion.div>

            {/* Crane Bird - flying near the bottom sakura */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 1.2 }}
              className="absolute left-[12px] top-[40px] w-[120px] pointer-events-none z-20 select-none"
            >
              <motion.div
                animate={{ 
                  y: [0, -7, 0],
                  x: [0, 5, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image
                  src="/images/crane.png"
                  alt="Flying crane bird"
                  width={898}
                  height={747}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </motion.div>
          </div>

        </section>

        {/* Вторая секция - Приглашение и Кнопка */}
        <section className="relative left-1/2 w-full min-h-screen max-w-[430px] -translate-x-1/2 flex flex-col items-center justify-start gap-[clamp(44px,7vh,72px)] pt-[clamp(32px,7vh,64px)] pb-24 px-6 text-center z-10">
          
          {/* Музыкальная кнопка, расположенная сразу под первой секцией */}
          <div className="relative z-30 flex w-full flex-col items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative w-28 h-28 flex items-center justify-center cursor-pointer group focus:outline-none"
              aria-label="Включить музыку"
            >
              {/* Rotating Circular Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: isPlaying ? 8 : 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                    fill="transparent"
                  />
                  <text className="fill-gold/80 font-serif tracking-[0.18em] text-[8.5px] uppercase font-light">
                    <textPath href="#circlePath" startOffset="0%">
                      включить музыку • включить музыку •
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Inner Button Circle */}
              <div className="relative w-14 h-14 rounded-full bg-cream border border-gold/40 flex items-center justify-center shadow-lg shadow-gold/5 group-hover:scale-105 transition-all duration-300 group-hover:border-gold/80">
                {/* Visual pulse indicator when playing */}
                {isPlaying && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-gold/10 animate-ping" />
                    <span className="absolute inset-[-4px] rounded-full border border-gold/20 animate-pulse" />
                  </>
                )}
                
                {/* SVG Icons for Play/Pause */}
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-gold transition-colors duration-300"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gold/80 group-hover:text-gold translate-x-[1px] transition-colors duration-300"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* Блок 1: Прокрутите вниз */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            <span className="font-serif text-[17px] uppercase tracking-[0.25em] text-muted block translate-x-6 text-center">
              Прокрутите вниз
            </span>
          </motion.div>

          {/* Блок 2: Мы женимся! */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="font-cursive whitespace-nowrap text-[clamp(76px,20vw,83px)] text-dark leading-none text-center">
              Мы женимся!
            </h2>
          </motion.div>

          {/* Блок 3: И хотим разделить с вами этот важный день! */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full relative z-20"
          >
            <p className="font-serif text-[clamp(16px,4vw,18px)] uppercase tracking-[0.13em] text-dark leading-relaxed text-center">
              И хотим разделить с вами этот важный день!
            </p>
          </motion.div>

          {/* Ветка сакуры между текстами (выходит слева, частично под верхним текстом) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative left-1/2 -mt-10 mb-6 h-[120px] w-screen -translate-x-1/2 z-10 pointer-events-none select-none"
          >
            <Image
              src="/images/sakura-middle.png"
              alt="Delicate sakura branch"
              width={634}
              height={419}
              className="absolute left-[-12%] top-1/2 -translate-y-1/2 h-auto w-[45vw] max-w-[280px] min-w-[180px] opacity-85"
            />
          </motion.div>


          {/* Блок 4: Дорогие друзья и родные! */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="-mt-2 w-full relative z-20"
          >
            <p className="font-cursive text-[clamp(64px,17vw,78px)] text-dark leading-[0.9] text-center">
              Дорогие друзья и
              <br />
              родные!
            </p>
          </motion.div>

          {/* Блок 5: Приглашение на торжество */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full relative z-20"
          >
            <p className="font-serif text-[clamp(16px,4vw,18px)] uppercase tracking-[0.13em] text-dark leading-relaxed text-center">
              Приглашаем вас на
              <br />
              торжество, посвященное
              <br />
              нашему бракосочетанию.
            </p>
          </motion.div>

          {/* Декорация после приглашения: розовая птичка слева и лепестки справа */}
          <div className="relative w-full h-[220px] mt-10 pointer-events-none select-none z-20">
            {/* Розовая птичка слева, летящая вправо */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute left-[12px] top-[40px] w-[110px]"
            >
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image
                  src="/images/swallow-pink.png"
                  alt="Swallow bird with pink wings"
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Лепестки сакуры (ветка) справа, летящие влево */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className="absolute left-1/2 top-[-52px] w-screen -translate-x-1/2 pointer-events-none select-none"
            >
              <Image
                src="/images/petals-wind.png"
                alt="Sakura petals in wind"
                width={1024}
                height={1024}
                className="absolute right-[-45px] top-0 h-auto w-[82vw] max-w-[390px] object-contain origin-right"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ marginTop: "140px" }}
            className="relative z-20 flex w-full flex-col items-center"
          >
            <h3 style={{ transform: "translateY(-20px)" }} className="font-cursive text-[clamp(72px,19vw,88px)] text-dark leading-none text-center mb-14">
              Дата:
            </h3>
            <p className="mx-auto font-serif text-[clamp(17px,4.5vw,20px)] uppercase tracking-[0.13em] text-dark leading-relaxed text-center mb-16">
              28 июня 2026 года
              <br />
              Время 16:00
            </p>
            <div style={{ marginTop: "30px" }} className="mx-auto w-[340px] max-w-[calc(100vw-48px)] font-serif text-dark">
              <div className="grid grid-cols-7 gap-y-7 text-[clamp(18px,4.8vw,22px)] uppercase tracking-normal text-muted mb-8">
                {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
                  <span key={day} className="text-center">
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-6 text-[clamp(20px,5.2vw,24px)] tracking-normal text-dark/75">
                {calendarWeeks.flat().map((day, index) => (
                  <span key={`${day ?? "empty"}-${index}`} className="relative flex h-8 items-center justify-center">
                    {day === 28 && (
                      <span className="absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-[42%] rotate-45 bg-rose/35 blur-[3px] before:absolute before:-left-[22px] before:top-0 before:h-11 before:w-11 before:rounded-full before:bg-rose/35 after:absolute after:-top-[22px] after:left-0 after:h-11 after:w-11 after:rounded-full after:bg-rose/35" />
                    )}
                    <span className="relative z-10">{day}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Блок обратного отсчета: До торжества */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="w-full mt-16 relative z-20 flex flex-col items-center"
          >
            <h3 className="font-cursive text-[clamp(60px,16vw,72px)] text-dark leading-none text-center mb-20 select-none">
              До торжества:
            </h3>
            {isMounted && timeLeft ? (
              <div className="flex items-start justify-center gap-3 sm:gap-5 font-serif text-dark select-none">
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-[clamp(28px,7vw,34px)] font-light leading-none">{timeLeft.days}</span>
                  <span className="text-[11px] tracking-[0.05em] text-muted mt-2 font-sans lowercase">дней</span>
                </div>
                <span className="text-[clamp(18px,4.5vw,24px)] text-dark/35 leading-none pt-[2px]">:</span>
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-[clamp(28px,7vw,34px)] font-light leading-none">{timeLeft.hours}</span>
                  <span className="text-[11px] tracking-[0.05em] text-muted mt-2 font-sans lowercase">часов</span>
                </div>
                <span className="text-[clamp(18px,4.5vw,24px)] text-dark/35 leading-none pt-[2px]">:</span>
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-[clamp(28px,7vw,34px)] font-light leading-none">{timeLeft.minutes}</span>
                  <span className="text-[11px] tracking-[0.05em] text-muted mt-2 font-sans lowercase">минут</span>
                </div>
                <span className="text-[clamp(18px,4.5vw,24px)] text-dark/35 leading-none pt-[2px]">:</span>
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-[clamp(28px,7vw,34px)] font-light leading-none">{timeLeft.seconds}</span>
                  <span className="text-[11px] tracking-[0.05em] text-muted mt-2 font-sans lowercase">секунд</span>
                </div>
              </div>
            ) : (
              <div className="h-[60px]" />
            )}
          </motion.div>

          {/* Декорация перед локацией: сакура слева и журавль справа */}
          <div className="relative w-full h-[250px] mt-20 pointer-events-none select-none z-20">
            {/* Сакура слева */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute left-1/2 top-[20px] w-screen -translate-x-1/2"
            >
              <Image
                src="/images/sakura-location.png"
                alt="Sakura branch location"
                width={945}
                height={678}
                className="relative left-[-4px] h-auto w-[65vw] max-w-[270px] object-contain"
              />
            </motion.div>

            {/* Журавль справа */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className="absolute right-[-40px] top-[-50px] w-[67%] max-w-[240px]"
            >
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image
                  src="/images/crane-location.png"
                  alt="Crane location bird"
                  width={1023}
                  height={1515}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Заголовок Локация */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full relative z-20 -mt-6"
          >
            <h3 className="font-cursive text-[clamp(64px,17vw,78px)] text-dark leading-none text-center select-none">
              Локация:
            </h3>
          </motion.div>

          {/* Адрес */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="w-full relative z-20 flex flex-col items-center mt-8"
          >
            <p className="font-serif text-[clamp(16px,4.5vw,19px)] uppercase tracking-[0.08em] text-[#4A4138] leading-[1.8] text-center">
              ГОРОД КАРАГАНДА<br />
              ПРОСПЕКТ ШАХТЕРОВ, 35/1<br />
              БАНКЕТНЫЙ ЗАЛ<br />
              <span className="whitespace-nowrap opacity-90 text-[1.05em] tracking-[0.15em] mt-2 block">` DASTUR HALL `</span>
            </p>
          </motion.div>

          {/* Кнопка 2GIS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full relative z-20 mt-[50px] flex justify-center mb-10"
          >
            <a 
              href="https://2gis.kz/karaganda/firm/70000001104916301" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative ml-6 flex items-center justify-center bg-[#4E433A] text-[#FAF6F1] font-serif uppercase tracking-[0.1em] text-[17px] h-[72px] w-[270px] rounded-full shadow-[0_10px_30px_rgba(78,67,58,0.35)] hover:bg-[#3d352e] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Реальная иконка 2GIS слева */}
              <div className="absolute -left-14 top-1/2 -translate-y-[50%] w-[86px] h-[86px] z-10 rotate-[-18deg] hover:rotate-0 transition-transform duration-300 drop-shadow-xl pointer-events-none">
                 <Image src="/images/2gis-real.png" alt="2GIS" width={150} height={150} className="w-full h-full object-contain rounded-[20px]" />
              </div>
              <span className="relative top-[1px] opacity-95">ОТКРЫТЬ КАРТУ</span>
            </a>
          </motion.div>

          {/* Новый блок с обрезанной птичкой и сакурой */}
          <div className="relative w-full h-[320px] mt-16 pointer-events-none select-none z-20 overflow-visible">
            {/* Изображение 1 (Птичка слева) */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute left-1/2 top-[-36px] w-screen -translate-x-1/2"
            >
              <motion.div animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <Image src="/images/block_part1.png" alt="Bird" width={600} height={600} className="relative left-[-32px] h-auto w-[55vw] max-w-[240px] object-contain" />
              </motion.div>
            </motion.div>

            {/* Изображение 2 (Сакура справа) */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              className="absolute right-[-5px] top-[24px] w-[70vw] max-w-[320px] translate-x-[15%]"
            >
              <motion.div animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="origin-right">
                <Image src="/images/block_part2.png" alt="Sakura" width={600} height={600} className="h-auto w-full object-contain origin-right" />
              </motion.div>
            </motion.div>
          </div>
        </section>



        {/* Четвертая секция - Анкета */}
        <section
          style={{ marginTop: "96px" }}
          className="relative left-1/2 w-full max-w-[430px] -translate-x-1/2 flex flex-col items-center pt-32 pb-5 px-10 z-10 text-center"
        >
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <h3 className="font-cursive text-[clamp(64px,17vw,78px)] text-dark leading-none text-center select-none">
              Анкета:
            </h3>
          </motion.div>

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="w-full flex flex-col items-center mt-12"
          >
            <p className="font-serif text-[clamp(15px,4vw,17px)] uppercase tracking-[0.08em] text-[#4A4138] leading-[1.8] text-center w-full">
              ПОДТВЕРДИТЕ, ПОЖАЛУЙСТА,<br/>СВОЁ ПРИСУТСТВИЕ:
            </p>
          </motion.div>

          {/* Форма */}
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{ marginTop: "48px" }}
              className="w-[95%] flex flex-col gap-10 text-[#4A4138] text-left"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!name.trim() || !attendance) {
                  alert("Пожалуйста, заполните все поля");
                  return;
                }
                setIsSubmitting(true);
                try {
                  const res = await fetch("/api/rsvp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: name.trim(),
                      attendance,
                    }),
                  });
                  if (res.ok) setIsSubmitted(true);
                  else alert("Произошла ошибка. Попробуйте еще раз.");
                } catch {
                  alert("Произошла ошибка. Попробуйте еще раз.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {/* Имя */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="ВАШЕ ИМЯ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b-[1.5px] border-[#4A4138] pb-3 text-[16px] font-serif uppercase tracking-[0.1em] placeholder:text-[#4A4138]/60 focus:outline-none focus:border-[#4A4138] transition-colors disabled:opacity-50"
                />
              </div>

              {/* Радиокнопки */}
              <div className="flex flex-col gap-6 mt-2">
                {[
                  "ОБЯЗАТЕЛЬНО ПРИДУ",
                  "ПРИДУ С СУПРУГОМ/СУПРУГОЙ",
                  "НЕ СМОГУ ПРИСУТСТВОВАТЬ"
                ].map((label, idx) => (
                  <label key={idx} className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-[26px] h-[26px] rounded-full border-[1.5px] border-[#4A4138] flex-shrink-0 mt-[2px] group-hover:bg-[#4A4138]/5 transition-colors">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value={label} 
                        checked={attendance === label}
                        onChange={(e) => setAttendance(e.target.value)}
                        disabled={isSubmitting}
                        className="peer sr-only" 
                      />
                      <div className="w-[14px] h-[14px] rounded-full bg-[#4A4138] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-serif text-[clamp(13px,3.8vw,15px)] uppercase tracking-[0.08em] leading-[1.4] text-left">
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#432F2C] text-[#FAF6F1] font-serif uppercase tracking-[0.15em] text-[16px] h-[68px] rounded-full shadow-[0_10px_30px_rgba(67,47,44,0.3)] hover:bg-[#322320] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ marginTop: "48px" }}
              className="w-[95%] p-8 border border-[#4A4138]/20 rounded-2xl bg-white/30 backdrop-blur-sm"
            >
              <p className="font-serif text-[18px] uppercase tracking-[0.1em] text-[#4A4138] leading-relaxed">
                Спасибо!<br/>Ваш ответ записан.
              </p>
            </motion.div>
          )}

          {/* Декорация в самом низу (под анкетой) */}
          <div className="relative left-1/2 w-screen h-auto mt-20 -translate-x-1/2 flex flex-row items-end justify-between pointer-events-none select-none z-0 px-0 pb-0">
            {/* Сакура слева */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-[60vw] max-w-[270px] origin-bottom-left"
            >
              <motion.div
                animate={{ rotate: [0, 1.5, 0], y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/sakura-location.png"
                  alt="Sakura footer branch"
                  width={945}
                  height={678}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Птичка справа */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="w-[30%] pb-[26px]"
            >
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, -5, 0],
                  rotate: [0, 4, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image
                  src="/images/swallow.png"
                  alt="Swallow bird"
                  width={636}
                  height={558}
                  className="h-auto w-full object-contain -mr-2"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
