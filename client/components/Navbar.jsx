"use client";

import { logout } from "@/utils/auth";
import Link from "next/link";



export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 backdrop-blur-2xl shadow-md text-white">
      <Link href="/dashboard" className="font-bold">TaskFlow</Link>
              <div className="flex justify-between gap-x-5">

        <Link href="/dashboard/profile" className="w-full bg-violet-800 backdrop-blur-2xl text-white px-4 py-2 rounded-md cursor-pointer">
          Profile
        </Link>
      <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
      </div>
    </nav>
  );
}
