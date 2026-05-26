"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="invite-page mx-auto min-h-[200vh] max-w-[430px] bg-transparent relative">
      {/* Static Background */}
      <div className="pointer-events-none fixed inset-0 mx-auto max-w-[430px] overflow-hidden z-0 bg-cream">
        {/* The mountain image is placed at the bottom, with higher opacity to ensure it is visible */}
        <div className="absolute inset-x-0 bottom-0 opacity-70">
          <Image
            src="/images/mountains-subtle.png"
            alt="Mountains background"
            width={1568}
            height={856}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {/* Soft elegant gradient overlay - adjusted to let the mountains show through clearly */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,241,0.7),rgba(250,246,241,0.2),rgba(250,246,241,0.7))]" />
      </div>

      {/* Content wrapper with relative positioning so it renders on top of the fixed background */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* We will add content step by step here */}
      </div>
    </main>
  );
}
