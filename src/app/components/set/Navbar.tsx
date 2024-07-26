"use client";

import { usePathname } from "next/navigation";
import {
  IconDeviceTvOld,
  IconHome2,
  IconMovie,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const navItems = [
  {
    link: "/",
    icon: <IconHome2 className="w-[26px] h-[26px] md:w-8 md:h-8" />,
  },
  {
    link: "/tv-shows",
    icon: <IconDeviceTvOld className="w-[26px] h-[26px] md:w-8 md:h-8" />,
  },
  {
    link: "/movie",
    icon: <IconMovie className="w-[26px] h-[26px] md:w-8 md:h-8" />,
  },
  {
    link: "/search",
    icon: <IconSearch className="w-[26px] h-[26px] md:w-8 md:h-8" />,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full fixed top-0 z-20 bg-gray-950 p-2.5 bg-opacity-80">
      <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-12">
        {navItems.map(({ link, icon }) => (
          <div
            key={link}
            className={`px-2 ${
              pathname === link ? "text-white" : "text-gray-500"
            }`}
          >
            <Link href={link}>{icon}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
