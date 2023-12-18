"use client";
import { useProfile } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/Tabs";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../../../components/icons/Right";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "/src/components/layout/MenuItemForm"
import DeleteButton from "/src/components/DeleteButton"

const EditMenuItemPage = () => {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItem,setMenuItem]  = useState(null)

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item)
      });
    });
  }, []);

  const handleFormSbumit = async (e,data) => {
    e.preventDefault();
     data = { ...data, _id: id };
    const savingPromise = new Promise(async (res, rej) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) res();
      else rej();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this delicious pizza ...",
      success: "Added a pizza.",
      error: "Could not add a pizza !",
    });

    setRedirectToItems(true);
  };


  const handleDelete = async () => {
    const promise  = new Promise(async(res,rej)=> {
      const response = await fetch("/api/menu-items?_id="+id,  {
        method:"DELETE",
      })
      if (response.ok) {
        res()
      }else {
        rej()
      }
    })
    await toast.promise(promise,{
      loading:"Deleting...",
      success:"Succesfully deleted !",
      error:"Could not delete !",
    })
    setRedirectToItems(true)
  }


  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return (
      <div className=" text-red-500 p-4 bg-gray-300  text-center  my-5">
        Loading user info
      </div>
    );
  }

  if (!data.admin) {
    return (
      <div className=" text-red-500 p-4 bg-gray-300  text-center  my-5">
        Not an admin !
      </div>
    );
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <Link
        href={"/menu-items"}
        className=" mx-auto mt-8 justify-center items-center bg-gray-200 text-primary rounded-3xl max-w-lg border-2  gap-2 p-3  flex"
      >
        <div className="rotate-180">
          <Right />
        </div>
        <span> All Items </span>
      </Link> 
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSbumit}/>
        <div className=" max-w-xs mx-auto mb-5"> 
        <DeleteButton label={"Delete this menu item"} onDelete={handleDelete}/>
     
        </div>
    </section>
  );
};

export default EditMenuItemPage;
