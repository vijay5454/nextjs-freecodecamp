"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <form onSubmit={onLogin} className="space-y-4">
        <h1 className="text-center text-3xl">Login</h1>
        <div className="space-x-2 flex items-end">
          <label htmlFor="email" className="flex-1">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="p-2 rounded-md text-black"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <div className="space-x-2 flex items-center">
          <label htmlFor="password" className="flex-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="p-2 rounded-md text-black"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div className="text-center">
          <button className="p-2 bg-white text-black rounded-md">Submit</button>
        </div>
      </form>
      <div className="mt-2">
        <Link href="/signup">
          <button type="submit">Want to SignUp?</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
