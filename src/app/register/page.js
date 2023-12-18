"use client";
import Image from "next/image";
import Link from "next/link";
import {  signIn } from "next-auth/react"
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false)


   const response =  await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.ok){
      setUserCreated(true)
    }
    else{
      setError(true)
    }
    setCreatingUser(false);
    setEmail("");
    setPassword("");
  }

  return (
    <section className=" my-10 ">
      <h1 className=" text-center text-primary text-4xl my-10">Register</h1>
      {userCreated && (
        <div className="my-4 text-center ">
          User created. <br/> Now you can <Link href={"/login"}> <span className="underline"> Login</span>  </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Error <br></br>Please try again later.
        </div>
      )}
      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={creatingUser}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          disabled={creatingUser}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button disabled={creatingUser} type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with social 
        </div>
        <button onClick={() => {signIn("google",{callbackUrl:"/"})}} className="flex items-center justify-center gap-5">
          <Image src={"/google.png"} width={30} height={30} alt="google" />
          Login with Google
        </button>
        <div className=" text-center my-4  text-gray-500 p-4">
        Existing account? {" "} <Link className="underline" href={"/login"}>Login here</Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
