"use client";

import { Bell, UserCircle } from "lucide-react";

interface TopbarProps {
  name: string;
}

export default function Topbar({ name }: TopbarProps) {
  return (
    <header className="bg-white h-20 rounded-xl shadow-md px-8 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-gray-500">
          Welcome back, {name}
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="text-gray-600 cursor-pointer"
          size={24}
        />

        <div className="flex items-center gap-3">
          <UserCircle
            size={42}
            className="text-blue-700"
          />

          <div>
            <p className="font-semibold text-gray-800">
              {name}
            </p>

            <p className="text-sm text-gray-500">
              Candidate
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}