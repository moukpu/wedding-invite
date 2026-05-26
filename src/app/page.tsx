"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="invite-page mx-auto min-h-[200vh] max-w-[430px] bg-cream relative">
      {/* Static Background */}
      <div className="pointer-events-none fixed inset-0 mx-auto max-w-[430px] overflow-hidden z-0">
        <div className="absolute inset-x-0 bottom-0 opacity-40">
          <Image
            src="/images/mountains-subtle.png"
            alt=""
            width={1568}
            height={856}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0.85),rgba(250,246,241,0.3),rgba(250,246,241,0.85))]" />
      </div>

      {/* Content wrapper with relative positioning so it renders on top of the fixed background */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* We will add content step by step here */}
      </div>
    </main>
  );
}
