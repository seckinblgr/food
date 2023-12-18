"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, {  useEffect, useState } from "react";
import UserForm from "/src/components/layout/UserForm"
import toast from "react-hot-toast";
import Tabs from "/src/components/layout/Tabs";


const ProfilPage = () => {

  const session = useSession();
  const { status } = session;
  const [user,setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched,setProfileFetched] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then(response => {
          response.json().then(data => {
          setUser(data)
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      })
    }
  }, [session, status]);

  const handleProfileInfoUpdate = async (e,data) => {
    e.preventDefault();
    const savingPromise = new Promise(async (res, rej) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) res();
      else rej();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Succesfully Saved !",
      error: "Could not Saved !",
    });
  };



  if (status === "loading"  || !profileFetched) {
    return <p className="flex justify-center text-primary items-center mx-auto my-4">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className=" mt-8 mx-auto mb-10">
      <Tabs isAdmin={isAdmin}/>
      <div className=" max-w-md mx-auto  mt-8">
      <UserForm user={user} onSave={handleProfileInfoUpdate}/>
      </div>
    </section>
  );
};

export default ProfilPage;
