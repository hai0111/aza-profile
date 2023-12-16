"use client";

import Footer from "@/components/Footer";
import Bio from "@/components/home/Bio";
import Contact from "@/components/home/Contact";
import Greeting from "@/components/home/Greeting";
import Hobbies from "@/components/home/Hobbies";
import Overview from "@/components/home/Overview";
import Website from "@/components/home/Website";
import Work from "@/components/home/Work";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen relative pt-20">
      <Navbar />
      <main className="w-full max-w-[60ch] mx-auto text-justify pb-5">
        <Greeting />
        <Overview />
        <Work />
        <Bio />
        <Hobbies />
        <Website />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
