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

        <Sidebar />

        <main className="flex-1 p-10">

          <Topbar name={user.name} />

          {/* Welcome Section */}

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 shadow-xl">

            <h1 className="text-4xl font-bold">
              Welcome back, {user.name} 👋
            </h1>

            <p className="mt-3 text-lg text-blue-100">
              Practice interviews, improve your coding skills and build a
              stronger resume with AI.
            </p>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                ATS Resume Score
              </p>

              <h2 className="text-5xl font-bold text-green-600 mt-2">
                76
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Coding Score
              </p>

              <h2 className="text-5xl font-bold text-blue-600 mt-2">
                82
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Interview Score
              </p>

              <h2 className="text-5xl font-bold text-purple-600 mt-2">
                88
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Overall Hiring Score
              </p>

              <h2 className="text-5xl font-bold text-orange-500 mt-2">
                82%
              </h2>

            </div>

          </div>

          {/* Quick Actions */}

          <h2 className="text-3xl font-bold mt-12 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <DashboardCard
              emoji="📄"
              title="Resume Upload"
              description="Upload and manage your resume."
              href="/resume"
            />

            <DashboardCard
              emoji="🧠"
              title="AI Resume Analysis"
              description="Analyze your resume using AI."
              href="/resume-analysis"
            />

            <DashboardCard
              emoji="💻"
              title="Coding Assessment"
              description="Practice coding questions."
              href="/coding"
            />

            <DashboardCard
              emoji="🎤"
              title="AI Interview"
              description="Practice AI mock interviews."
              href="/interview"
            />

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-xl shadow-lg mt-12 p-8">

            <h2 className="text-3xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="border rounded-lg p-4 flex justify-between">

                <span>
                  📄 Resume Uploaded
                </span>

                <span className="text-green-600 font-semibold">
                  Completed
                </span>

              </div>

              <div className="border rounded-lg p-4 flex justify-between">

                <span>
                  🧠 AI Resume Analysis
                </span>

                <span className="text-green-600 font-semibold">
                  Completed
                </span>

              </div>

              <div className="border rounded-lg p-4 flex justify-between">

                <span>
                  💻 Coding Assessment
                </span>

                <span className="text-green-600 font-semibold">
                  Completed
                </span>

              </div>

              <div className="border rounded-lg p-4 flex justify-between">

                <span>
                  🎤 AI Mock Interview
                </span>

                <span className="text-green-600 font-semibold">
                  Completed
                </span>

              </div>

            </div>

          </div>

        </main>

      </div>
    </ProtectedRoute>
  );
}