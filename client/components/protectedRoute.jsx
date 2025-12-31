"use client";
import { useEffect } from "react";
import { getToken } from "@/utils/auth";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const token = getToken();
    if (!token) window.location.href = "/login";
  }, []);

  return children;
}
