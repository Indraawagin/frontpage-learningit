import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Logo from "public/images/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ onLight }) {
  const [User, setUser] = useState(() => null);
  const [ToggleMenu, setToggleMenu] = useState(() => false);
  useEffect(() => {
    const userCookies =
      decodeURIComponent(window.document.cookie)
        ?.split(";")
        ?.find?.((item) => item.indexOf("LEARNINGIT:user") > -1)
        ?.split("=")[1] ?? null;
    setUser(userCookies ? JSON.parse(userCookies) : null);
  }, []);

  const linkColor = onLight ? "text-gray-900" : "text-white";
  const router = useRouter();
  const linkCTA =
    router.pathname.indexOf("/login") > -1
      ? `${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/register`
      : `${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/login`;
  const textCTA = router.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";

  return (
    <header
      className={[
        "flex justify-between items-center",
        ToggleMenu ? "fixed w-full -mx-4 px-4" : "",
      ].join(" ")}
    >
      <div className="z-50 md:h-[54px]">
        <Logo className="on-dark"></Logo>
      </div>
      <div className="flex md:hidden">
        <button
          className={["toggle z-50", ToggleMenu ? "active" : ""].join(" ")}
          onClick={() => setToggleMenu((prev) => !prev)}
        ></button>
      </div>
      <ul
        className={[
          "transition-all duration-200 items-center fixed inset-0 bg-blue-900 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible",
          ToggleMenu ? "opacity-100 visible z-20" : "opacity-0 invisible",
        ].join(" ")}
      >
        <li className="mt-4 md:my-0">
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 font-medium py-3",
              ].join(" ")}
            >
              Home
            </a>
          </Link>
        </li>
        <li className="mt-4 md:my-0">
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 font-medium py-3",
              ].join(" ")}
            >
              Pricing
            </a>
          </Link>
        </li>
        <li className="mt-4 md:my-0">
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 font-medium py-3",
              ].join(" ")}
            >
              Features
            </a>
          </Link>
        </li>
        <li className="mt-4 md:my-0">
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 font-medium py-3",
              ].join(" ")}
            >
              Story
            </a>
          </Link>
        </li>
        <li className="my-8 md:my-0">
          {User ? (
            <a
              target="_blank"
              rel="noopener noereferrer"
              href={linkCTA}
              className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 
            text-white hover:text-teal-500 text-lg px-6 py-3 ml-6 inline-flex items-center"
            >
              <span className="rounded-full overflow-hidden mr-3 border-2 border-orange-500">
                <img
                  src={User?.thumbnail}
                  alt={User?.name ?? "Username"}
                  className="object-cover w-8 h-8 inline-block"
                />
              </span>
              Hi, {User?.name}
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noereferrer"
              href={linkCTA}
              className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 
            text-white hover:text-teal-500 text-lg px-6 py-3 ml-6"
            >
              {textCTA}
            </a>
          )}
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};
