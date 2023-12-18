"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if(userName && userName.includes(" ")){
    userName = userName.split(" ")[0]
  }
  return (
    <header className="flex items-center justify-between">
      <Link className=" text-primary font-semibold text-2xl" href={"/"}>
        PIZZA
      </Link>
      <nav className="flex  gap-10 text-gray-500 font-semibold items-center">
        <Link className=" hover:text-primary" href={"/"}>
          Home
        </Link>
        <Link className=" hover:text-primary" href={""}>
          Menu
        </Link>
        <Link className=" hover:text-primary" href={""}>
          About
        </Link>
        <Link className=" hover:text-primary" href={""}>
          Contact
        </Link>
      </nav>
      <nav className="flex items-center gap-4">
        {status === "authenticated" && (
          <>
          <Link className=" font-bold whitespace-nowrap text-gray-600 text-sm" href={"/profile"}>Welcome, {userName}</Link>
          <button
            className=" bg-primary text-white px-6 py-2 hover:bg-red-400 rounded-full"
            onClick={() => signOut()}
            >
            Logout
          </button>
            </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link  className="" href={"/login"}>
              Login
            </Link>
            <Link
              className=" bg-primary text-white px-6 py-2 hover:bg-red-400 rounded-full"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
