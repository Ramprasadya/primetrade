"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/protectedRoute";
import api from "@/services/api";
import { getToken } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const token = getToken();

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    api.get("/user/profile", headers).then((res) => setUser(res.data));
  }, []);

  const updateProfile = async () => {
    await api.put("/user/profile", { name: user.name }, headers);
    alert("Profile updated");
  };

  return (
    <ProtectedRoute>
      <Navbar/>
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl mb-4">Profile</h2>

        <input
          className="border p-2 w-full mb-3"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          value={user.email}
          disabled
        />

        <button
          onClick={updateProfile}
          className="bg-black text-white px-4 py-2"
        >
          Update
        </button>
      </div>
    </ProtectedRoute>
  );
}
