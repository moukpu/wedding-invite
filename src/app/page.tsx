"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
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

      <main className="invite-page min-h-[100vh] bg-cream/80 relative overflow-hidden">

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
      </main>
    </>
  );
}
