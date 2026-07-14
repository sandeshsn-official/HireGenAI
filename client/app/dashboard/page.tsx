"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import Topbar from "../../components/Topbar";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-10">
            <Topbar name={user.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <DashboardCard
  emoji="📄"
  title="Resume Upload"
  description="Upload and manage your resume."
  href="/resume"
/>

            <DashboardCard
  emoji="🧠"
  title="AI Resume Analysis"
  description="Get AI-powered resume feedback."
  href="/resume-analysis"
/>

            <DashboardCard
  emoji="💻"
  title="Coding Assessment"
  description="Practice DSA and coding problems."
  href="/coding"
/>

            <DashboardCard
  emoji="🎤"
  title="AI Interview"
  description="Practice technical interviews with AI."
  href="/interview"
/>

          </div>

          <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Activity
            </h2>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>✅ Resume not uploaded yet</li>
              <li>💻 Coding assessment not started</li>
              <li>🎤 AI interview not started</li>
            </ul>

          </div>

        </main>

      </div>
    </ProtectedRoute>
  );
}