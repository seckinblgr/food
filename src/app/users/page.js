"use client";
import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/Tabs";
import { useProfile } from "/src/components/UseProfile";
import Trash from "/src/components/icons/Trash";
import Edit from "/src/components/icons/Edit";
import Link from "next/link";

const UsersPage = () => {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
   fetch("/api/users").then(response => {
    response.json().then(users => {
      setUsers(users)
    })
   })
  }, [])
  

  if (loading) {
    return (
      <p className="flex justify-center text-primary items-center mx-auto my-4">
        Loading user info !
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
    <section className=" max-w-xl mx-auto mt-8 mb-16">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-3 gap-4 flex items-center"
            >
              <div className="gap-4 grid grid-cols-2 grow">
                <div className=" text-gray-700">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span>No name</span>}
                </div>
                <span className=" text-gray-500">{user.email}</span>
              </div>
              <div className="flex  gap-2">
                <Link
                  href={"/users/" + user._id}
                  className=" w-10  flex item-center justify-center p-2 rounded-md  bg-white  hover:text-white hover:bg-cyan-400 transition-all  "
                >
                  <Edit className="w-5 h-5  " />
                </Link>
                <Link
                  href={"#"}
                  className=" w-10  bg-white   flex item-center justify-center p-2 rounded-md hover:text-white hover:bg-red-400 transition-all  "
                >
                  <Trash className="w-5 h-5  " />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
