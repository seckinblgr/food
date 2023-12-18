"use client";
import {  signIn } from "next-auth/react"
import Image from "next/image";
import React from "react";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false)    

  async function handleFormSubmit (e) {
    e.preventDefault();
    setLoginInProgress(true)
   await signIn("credentials" ,{email,password,callbackUrl:"/"});
   setLoginInProgress(false)
  };

  return (
    <section className="my-10">
      <h1 className=" text-center text-primary text-4xl my-10">Login</h1>
      <form className="block max-w-sm mx-auto"  onSubmit={handleFormSubmit}>
        <input
         name="email"
          disabled={loginInProgress}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
        name="password"
          disabled={loginInProgress}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with social
        </div>
        <button type="button" onClick={() => {signIn("google",{callbackUrl:"/"})}} className="flex items-center justify-center gap-5">
          <Image src={"/google.png"} width={30} height={30} alt="google" />
          Login with Google
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
