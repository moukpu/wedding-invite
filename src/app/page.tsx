"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
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

      <main className="invite-page min-h-[900vh] bg-cream/80 relative overflow-hidden">

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
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start gap-[clamp(44px,7vh,72px)] pt-[clamp(32px,7vh,64px)] pb-24 px-6 text-center z-10 max-w-[430px] mx-auto">
          
          {/* Музыкальная кнопка, расположенная сразу под первой секцией */}
          <div className="relative left-1/2 z-30 flex w-screen max-w-[430px] -translate-x-[calc(50%-24px)] flex-col items-center justify-center">
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
            <p className="relative left-1/2 w-[calc(100vw-24px)] max-w-[430px] -translate-x-[calc(50%-24px)] font-serif text-[clamp(16px,4vw,18px)] uppercase tracking-[0.13em] text-dark leading-relaxed text-center">
              И хотим разделить с вами этот важный день!
            </p>
          </motion.div>

          {/* Ветка сакуры между текстами (выходит слева, частично под верхним текстом) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative -mt-10 mb-6 h-[120px] w-full max-w-[430px] z-10 pointer-events-none select-none"
          >
            <Image
              src="/images/sakura-middle.png"
              alt="Delicate sakura branch"
              width={634}
              height={419}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-auto w-[240px] max-w-none opacity-85"
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
            <p className="relative left-1/2 w-[calc(100vw-24px)] max-w-[430px] -translate-x-[calc(50%-24px)] font-serif text-[clamp(16px,4vw,18px)] uppercase tracking-[0.13em] text-dark leading-relaxed text-center">
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
              className="absolute right-[-45px] top-[10px] w-[80%] max-w-[340px] pointer-events-none select-none"
            >
              <Image
                src="/images/petals-wind.png"
                alt="Sakura petals in wind"
                width={780}
                height={590}
                className="h-auto w-full object-contain origin-right"
              />
            </motion.div>
          </div>

        </section>
      </main>
    </>
  );
}
