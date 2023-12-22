import React, { ReactNode } from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface IWebsite {
  icon: ReactNode;
  title: string;
  link: string;
}

const websites: IWebsite[] = [
  {
    icon: <IoLogoGithub />,
    title: "@hai0111",
    link: "https://github.com/hai0111",
  },
  {
    icon: <FaInstagram />,
    title: "@nv.hai111",
    link: "https://www.instagram.com/nv.hai111",
  },
];

const Website = () => (
  <div className="mt-6">
    <h3 className="text-xl font-bold underline decoration-4 decoration-gray-500 underline-offset-4 mb-3">
      On the web
    </h3>

    {websites.map((item) => (
      <div key={item.link}>
        <Link
          href={item.link}
          className="inline-flex items-center h-[2rem] px-4 rounded-md gap-2 text-teal-600 dark:text-teal-200 bg-teal-600 bg-opacity-0 hover:bg-opacity-25 transition-all duration-200"
        >
          {item.icon}
          <strong>{item.title}</strong>
        </Link>
      </div>
    ))}
  </div>
);

export default Website;
