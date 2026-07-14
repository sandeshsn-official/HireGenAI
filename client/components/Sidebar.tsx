"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Code2,
  Mic,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen shadow-xl">

      <div className="p-6 border-b border-blue-600">
        <h1 className="text-3xl font-bold">HireGenAI</h1>
      </div>

      <nav className="p-5 space-y-2">

        <Link
  href="/dashboard"
  className="flex items-center gap-3 p-3 rounded-lg bg-white text-blue-700 font-semibold"
>
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          href="/resume"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <FileText size={22} />
          Resume
        </Link>

        <Link
          href="/coding"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <Code2 size={22} />
          Coding Test
        </Link>

        <Link
          href="/interview"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <Mic size={22} />
          AI Interview
        </Link>

        <Link
          href="/results"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
        >
          <BarChart3 size={22} />
          Results
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition text-white w-full text-left mt-10"
        >
          <LogOut size={22} />
          Logout
        </button>

      </nav>

    </aside>
  );
}