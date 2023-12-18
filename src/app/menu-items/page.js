"use client";
import Link from "next/link";
import { useProfile } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/Tabs";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

const MenuItemsPage = () => {
    
  const [menuItems,setMenuItems] = useState([])
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch("/api/menu-items").then(res => {
        res.json().then(menuItems => {
            setMenuItems(menuItems)
        }) 
    })
  }, [])
  

  if (loading) {
    return (
      <p className="flex justify-center text-primary items-center mx-auto my-4">
        Loading user info ...
      </p>
    );
  }

  if (!data.admin) {
    return (
      <p className="flex justify-center text-primary items-center mx-auto my-4">
        Not an admin !
      </p>
    );
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          href={"/menu-items/new"}
          className="flex justify-center button border-2 bg-gray-200 p-4 rounded-md text-primary items-center mx-auto my-4 "
        >
          Create a new menu item{" "}
         <span className="ml-4"> <Right /></span>
        </Link>
      </div>
      <div className="max-w-sm mx-auto">
        <h2 className=" text-sm text-gray-500 mt-5 mb-2 ">Edit item</h2>
        <div className="grid grid-cols-3 gap-4 mb-10 ">
        {menuItems?.length > 0 && menuItems.map(item => (
            <Link href={"/menu-items/edit/"+item._id} key={item._id} className="border-2 transition-all py-4 hover:bg-gray-200 rounded-md flex-col p-2">
                <div className="relative ">
                <Image src={item.image} alt="pizza" width={"200"} height={"200"} className="border-2 rounded-md border-red-200"/>
                </div>
                <div className="text-center text-sm mt-2 capitalize text-gray-700">
                {item.name}
                </div>
            </Link>
        ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
