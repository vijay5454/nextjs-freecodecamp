"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await axios.get("/api/users/logout");
    alert(response.data.message);
    router.push("/login");
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-2">
      <h1>Profile</h1>
      <button
        className="bg-purple-300 rounded-md px-4 py-2 hover:bg-purple-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
