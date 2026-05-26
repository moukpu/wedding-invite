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
      <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 px-6 text-center z-10">
        
        {/* Sakura Branch - positioned in the upper-left, extending horizontally, transparent background */}
        <div className="absolute left-0 top-0 w-[80%] max-w-[340px] pointer-events-none z-20 select-none">
          <Image
            src="/images/sakura-top.png"
            alt="Sakura branch"
            width={839}
            height={839}
            className="h-auto w-full object-contain origin-top-left"
            priority
          />
        </div>

        {/* Flying Swallow Bird - floating on the right side, transparent background */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="absolute right-8 top-32 w-[90px] pointer-events-none z-20 select-none"
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0],
              x: [0, 4, 0],
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

        {/* Content Wrapper */}
        <div className="relative mt-auto mb-24 z-30 flex flex-col items-center">
          {/* Content will go here */}
        </div>

      </section>
    </main>
  );
}
