"use client";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>

      <Navbar />

      <main className="bg-gray-100 min-h-screen">

        <div className="max-w-7xl mx-auto p-10">

          <h1 className="text-5xl font-bold text-blue-600">
  Welcome, {user.name}
</h1>

<p className="mt-3 text-xl text-gray-700">
  Role: <strong>{user.role}</strong>
</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

            <DashboardCard
              emoji="📄"
              title="Resume Upload"
              description="Upload your latest resume."
            />

            <DashboardCard
              emoji="🧠"
              title="AI Resume Analysis"
              description="Get an AI score and suggestions."
            />

            <DashboardCard
              emoji="💻"
              title="Coding Test"
              description="Solve DSA problems online."
            />

            <DashboardCard
              emoji="🎤"
              title="AI Interview"
              description="Practice with an AI interviewer."
            />

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}