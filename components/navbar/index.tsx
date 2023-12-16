"use client";

import React, { ReactNode, useContext } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io5";
import ThemeToggleButton from "./ToggleTheme";

interface INavLink {
  text: string;
  link: string;
  icon?: ReactNode;
}

const Navbar = () => {
  const navLinks: INavLink[] = [
    {
      link: "/works",
      text: "Works",
    },
    {
      link: "/wallpapers",
      text: "Wallpapers",
    },
    {
      link: "/posts",
      text: "Posts",
    },
    {
      link: "/uses",
      text: "Uses",
    },
    {
      link: "https://github.com/hai0111?tab=repositories",
      text: "Sources",
      icon: <IoLogoGithub />,
    },
  ];

  return (
    <header className="flex justify-center backdrop-blur-md bg-white bg-opacity-25 dark:bg-transparent fixed top-0 left-0 right-0 z-10">
      <main className="flex items-center w-full max-w-[768px] p-2">
        <Logo />
        <div className="inline-flex ml-5">
          {navLinks.map((item) => (
            <Link
              href={item.link}
              key={item.link}
              className="p-2 inline-flex items-center gap-1 hover:underline underline-offset-2"
            >
              {item.icon}
              {item.text}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        <ThemeToggleButton />
      </main>
    </header>
  );
};

export default Navbar;
