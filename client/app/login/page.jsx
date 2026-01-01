"use client";
import api from "@/services/api";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    if (!form.email || !form.password)
      return alert("All fields required");

    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-3">
        <input
          placeholder="Email"
          className="border px-3 py-2 rounded-md w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2  rounded-md w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

         <button onClick={submit} className="w-full bg-violet-800 backdrop-blur-2xl text-white px-4 py-2 rounded-md cursor-pointer">
          Login
        </button>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => (window.location.href = "/signup")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
