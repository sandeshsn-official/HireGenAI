"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-white">
        HireGenAI
      </h1>

      <button
        onClick={logout}
        className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  );
}