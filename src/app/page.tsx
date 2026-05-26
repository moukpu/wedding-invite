"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="invite-page mx-auto min-h-[200vh] max-w-[430px] bg-cream relative">
      {/* Static Background at the top with fade-out at the bottom */}
      <div className="pointer-events-none fixed inset-x-0 top-0 mx-auto max-w-[430px] h-[65vh] overflow-hidden z-0">
        <Image
          src="/images/mountains-subtle.png"
          alt="Watercolor mountains background"
          fill
          className="object-cover object-top scale-[1.08]"
          priority
        />
        {/* Gradient overlay to smoothly evaporate the bottom of the mountains into the cream background */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0)_20%,rgba(250,246,241,1)_100%)]" />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* Content will go here */}
      </div>
    </main>
  );
}
