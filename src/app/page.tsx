"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="invite-page mx-auto min-h-[100vh] max-w-[430px] bg-cream relative overflow-hidden">
      {/* Static Background - Mountains */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[65vh] overflow-hidden z-0">
        <Image
          src="/images/mountains-subtle.png"
          alt="Watercolor mountains background"
          fill
          className="object-cover object-top scale-[1.08]"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0)_20%,rgba(250,246,241,1)_100%)]" />
      </div>

      {/* Hero Section Container */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-between pt-32 pb-16 px-6 text-center z-10">
        
        {/* Sakura Branch - positioned in the upper-left, extending horizontally, transparent background */}
        <div className="absolute left-0 top-0 w-[80%] max-w-[340px] pointer-events-none z-20 select-none">
          <Image
            src="/images/sakura-top.png"
            alt="Sakura branch"
            width={983}
            height={871}
            className="h-auto w-full object-contain origin-top-left"
            priority
          />
        </div>

        {/* Flying Swallow Bird - slightly enlarged and shifted right to be separate from the branch */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="absolute left-[60%] top-[90px] w-[88px] pointer-events-none z-20 select-none"
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
              width={901}
              height={901}
              className="h-auto w-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Spacer for top illustrations */}
        <div className="h-[220px]" />

        {/* Couple Names - Styled exactly like photo 3 with a giant light ampersand in the background */}
        <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-[320px] z-30">
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
              className="font-cursive text-[76px] text-dark leading-none -translate-x-[45px]"
            >
              Ринат
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-cursive text-[76px] text-dark leading-none translate-x-[45px] mt-6"
            >
              Динара
            </motion.span>
          </div>
        </div>

        {/* Small subtitle at the bottom of hero */}
        <div className="relative z-30 mt-auto flex flex-col items-center">
          <p className="text-[12px] uppercase tracking-[0.25em] text-muted mb-2">Приглашение на свадьбу</p>
          <div className="w-[40px] h-[1px] bg-gold/50" />
        </div>

      </section>
    </main>
  );
}
