"use client";
import { getToken } from "@/utils/auth";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = getToken();

    if (token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
