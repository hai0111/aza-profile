"use client";

import FadeUp from "@/components/animations/FadeUp";
import Bio from "@/components/home/Bio";
import Contact from "@/components/home/Contact";
import Greeting from "@/components/home/Greeting";
import Hobbies from "@/components/home/Hobbies";
import Overview from "@/components/home/Overview";
import Website from "@/components/home/Website";
import Work from "@/components/home/Work";

export default function Home() {
  return (
    <main className="w-full max-w-[62ch] mx-auto text-justify pb-5 px-5">
      <FadeUp onAnimationStart={() => window.scrollTo({ top: 0 })}>
        <Overview />
      </FadeUp>

      <FadeUp duration={0.5} delay={0.2}>
        <Greeting />
        <Work />
        <Bio />
        <Hobbies />
      </FadeUp>
      <Website />
      <Contact />
    </main>
  );
}
