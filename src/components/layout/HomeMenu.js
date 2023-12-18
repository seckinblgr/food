"use client"
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";
import { useEffect } from "react";

const HomeMenu = () => {
useEffect(() => {
fetch("api/menu-items").then(res => {
  res.json().then(menuItems => {
   const bestSellers = menuItems.slice(-3)
   console.log(bestSellers)
  })
})
}, [])

  return (
    <section className="">
      <div className=" absolute justify-start left-0 right-0 w-full">
        <div className="h-48 absolute w-48  -left-34 left-24  rotate-45 -top-24 -z-10">
          <Image src={"/marul.png"} layout="fill" objectFit="contain" />
        </div>
        <div className="h-48  absolute  w-48  right-52 -top-32 -rotate-12 -z-10">
          <Image src={"/marul.png"} layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className=" text-center mb-5 ">
        <SectionHeader subHeader={"check out"} mainHeader={"Our Best Sellers"}/>
      </div>
      <div className="grid-cols-3 grid gap-4">
        <MenuItem name={"Pepperonni Pizza"} />
        <MenuItem name={"Italian Pizza"} />
        <MenuItem name={"Cheese Pizza"} />
        <MenuItem name={"Special Pizza"} />
        <MenuItem name={"Mixed Pizza"} />
        <MenuItem name={"Meatmix Pizza"} />
      </div>
    </section>
  );
};

export default HomeMenu;
