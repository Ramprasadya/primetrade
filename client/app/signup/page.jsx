"use client";
import { useState } from "react";
import api from "@/services/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Signup successful. Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="border px-3 py-2  rounded-md w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2  rounded-md w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2  rounded-md w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-violet-800 backdrop-blur-2xl text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Sign Up
        </button>

        <p className="text-md text-center text-gray-300">
          Already have an account?{" "}
          <span
            className="text-blue-600 text-md cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
