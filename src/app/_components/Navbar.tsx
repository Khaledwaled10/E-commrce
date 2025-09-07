"use client";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { cartRes } from "../cart/type/cart.interface";

export default function Navbar() {
  const { data: session, status } = useSession();

  const link = [
    { path: "/", element: "home" },
    { path: "/product", element: "product" },
    { path: "/brands", element: "brands" },
    { path: "/categories", element: "categories" },
  ];

  const auth = [
    { path: "/auth/login", element: "login" },
    { path: "/auth/register", element: "register" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function handlelogout() {
    signOut({ callbackUrl: "/" });
    setIsOpen(false); // يقفل المينيو بعد اللوج آوت
  }

  const { data } = useQuery<cartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/auth/cart");
      const payload = await res.json();
      return payload;
    },
  });

  return (
    <nav className="bg-light w-full border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={() => setIsOpen(false)}
        >
          <Image src={logo} alt="logo" />
        </Link>

        {/* Toggle button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex justify-between`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row gap-5 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {link.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="block py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:p-0 dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.element.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="font-medium flex flex-col text-gray-500 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row gap-5 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li onClick={() => setIsOpen(false)} className="cursor-pointer">
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li onClick={() => setIsOpen(false)} className="cursor-pointer">
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li onClick={() => setIsOpen(false)} className="cursor-pointer">
              <i className="fa-brands fa-google"></i>
            </li>

            {status === "unauthenticated" ? (
              <>
                {auth.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="block py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:p-0 dark:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.element.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                {session?.user?.image && (
                  <li onClick={() => setIsOpen(false)}>
                    <Image
                      width={32}
                      height={32}
                      src={session.user.image}
                      className="w-8 h-8 rounded-full"
                      alt="user avatar"
                    />
                  </li>
                )}
                <li onClick={() => setIsOpen(false)}>Hi {session?.user?.name}</li>
                <li className="cursor-pointer" onClick={handlelogout}>
                  Logout
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link className="relative" href="/cart">
                    <span className="absolute -top-2 -right-8 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {data?.numOfCartItems}
                    </span>
                  </Link>
                  <i className="fa-solid fa-cart-shopping"></i>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
