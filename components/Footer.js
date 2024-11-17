import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-row items-center justify-center absolute bottom-5 w-full md:hidden">
      <Link
        href="/dashboard/form"
        className="m-auto border-2 border-white rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path
            fill="none" // Remove the fill if not needed
            stroke="url(#gradient)" // Apply gradient to the stroke
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.75 7.75h-10m5-5v10"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default Footer;
