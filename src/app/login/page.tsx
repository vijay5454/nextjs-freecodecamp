"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("profile");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Something wents wrong!");
    } finally {
      setLoading(false);
    }
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
          <button
            className="p-2 bg-white text-black rounded-md"
            disabled={loading}
          >
            {loading ? "Processing" : "Submit"}
          </button>
        </div>
      </form>
      <div className="mt-2">
        <Link href="/signup">
          <button type="submit">Want to SignUp?</button>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
