"use client"
import {useProfile} from "/src/components/UseProfile"
import EditableImage from "src/components/layout/EditableImage";
import UserTabs from "/src/components/layout/Tabs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../../components/icons/Right";
import { redirect } from 'next/navigation'
import MenuItemForm from "/src/components/layout/MenuItemForm"



const NewMenuItem = () => {
 
    const {loading,data} = useProfile();

    const [redirectToItems, setRedirectToItems] = useState(false)
    
  
    const handleFormSbumit = async (e,data) => {
      e.preventDefault();
      const savingPromise = new Promise(async (res, rej) => {
        const response = await fetch("/api/menu-items", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) res();
        else rej();
      });
  
      await toast.promise(savingPromise,{
          loading:"Saving this delicious pizza ...",
          success:"Added a pizza.",
          error:"Could not add a pizza !",
      })

      setRedirectToItems(true)

    };

    if (redirectToItems) {
        return redirect("/menu-items")
    }


    if (loading) {
        return  <div className=" text-red-500 p-4 bg-gray-300  text-center  my-5">
        Loading user info
    </div>
    }

    if (!data.admin) {
        return  <div className=" text-red-500 p-4 bg-gray-300  text-center  my-5">
        Not an admin !
    </div>
    }



    return (
        <section className="mt-8">
        <UserTabs isAdmin={true} />
        <Link href={"/menu-items"} className=" mx-auto mt-8 justify-center items-center bg-gray-200 text-primary rounded-3xl max-w-lg border-2  gap-2 p-3  flex">
            <div className="rotate-180"><Right/></div>
            <span> All Items </span>
        </Link>
        <MenuItemForm menuItem={null} onSubmit={handleFormSbumit}/>
      </section>
    )

}

export default NewMenuItem