"use client";

import { useState, useEffect } from "react";
import Tabs from "/src/components/layout/Tabs";
import { useProfile } from "/src/components/UseProfile";
import toast from "react-hot-toast";
import Trash from "/src/components/icons/Trash";
import Edit from "/src/components/icons/Edit";


const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (res, rej) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) res();
      else rej();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category... "
        : "Creating your new category...",
      success: editedCategory
        ? " Category updated !"
        : "Succesfully created a new category !",
      error: "Could not a create !",
    });
  };

  const handleDelete = async (_id) => {
    const promise = new Promise(async (res, rej) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        res();
      } else {
        rej();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting ...",
      success : "Deleted !",
      error:"Could not delete !"
    })

    fetchCategories()
  };

  if (profileLoading) {
    return (
      <p className="flex justify-center text-primary items-center mx-auto my-4">
        Loading user info !
      </p>
    );
  }

  if (!profileData.admin) {
    return (
      <p className="flex justify-center text-primary items-center mx-auto my-4">
        Not an admin !
      </p>
    );
  }

  return (
    <section className=" mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
      <form className=" mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end ">
          <div className="grow">
            <label className="text-sm text-gray-500">
              {editedCategory ? "Update category " : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>{" "}
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className=" pb-4 flex gap-1">
            <button className="border  border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button onClick={() => {setEditedCategory(null); setCategoryName("");}} className="button">Cancel</button>
          </div>
        </div>
      </form>
      <div className=" max-w-sm mx-auto  mb-5">
        <h2 className="  mt-8 mb-1 text-sm text-gray-500 ">
          Exsisting Category{" "}
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className=" bg-gray-100 rounded-xl p-2 px-4 flex justify-between  items-center gap-2  mb-2 "
            >
              <div>{c.name}</div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setEditedCategory(c), setCategoryName(c.name);
                  }}
                  className=" w-10  bg-white  hover:text-white hover:bg-cyan-400 transition-all  "
                >
                  <Edit className="w-5 h-5  -ml-2 " />
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className=" w-10 bg-white  hover:text-white hover:bg-red-400 transition-all  "
                >
                  <Trash className="w-5 h-5 -ml-2" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
