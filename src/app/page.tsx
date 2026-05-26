"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="invite-page mx-auto min-h-[200vh] max-w-[430px] bg-transparent relative">
      {/* Static Background */}
      <div className="pointer-events-none fixed inset-0 mx-auto max-w-[430px] overflow-hidden z-0">
        {/* We use scale-118 and object-cover to crop the watercolor paper edges */}
        <Image
          src="/images/mountains-subtle.png"
          alt="Watercolor mountains background"
          fill
          className="object-cover scale-[1.18]"
          priority
        />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* Content will go here */}
      </div>
    </main>
  );
}
