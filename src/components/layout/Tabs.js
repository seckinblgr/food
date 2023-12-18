"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className=" flex justify-center items-center mx-auto gap-2 tabs">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        {" "}
        Profile{" "}
      </Link>
      {isAdmin && (
        <>
          <Link  href={"/categories"} className={path === "/categories" ? "active" : ""}>
            Categories
          </Link>
          <Link className={path.includes("menu-items") ? "active": ""} href={"/menu-items"}>
            Menu Items
          </Link>
          <Link className={path.includes("/users")  ? "active" : ""} href={"/users"}>
            Users
          </Link>
          <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default Tabs;
