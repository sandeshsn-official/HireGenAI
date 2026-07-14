"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Analysis {
  score: number;
  skillsFound: string[];
  missingSkills: string[];
  strengths: string[];
  suggestions: string[];
}

export default function ResumeAnalysis() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeResume();
  }, []);

  const analyzeResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const resumeId = localStorage.getItem("resumeId");

      if (!resumeId) {
        alert("Please upload a resume first.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/ai/resume/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error(err);
      alert("Could not analyze resume");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Analyzing Resume...</h1>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          No analysis available.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-blue-600 mb-10">
          AI Resume Analysis
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold">
            ATS Score
          </h2>

          <p className="text-7xl text-green-600 font-bold mt-4">
            {analysis.score}/100
          </p>

        </div>

        <div className="grid grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Skills Found
            </h2>

            <ul className="space-y-2">

              {analysis.skillsFound.map((skill, index) => (
                <li key={index}>✅ {skill}</li>
              ))}

            </ul>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Missing Skills
            </h2>

            <ul className="space-y-2">

              {analysis.missingSkills.map((skill, index) => (
                <li key={index}>❌ {skill}</li>
              ))}

            </ul>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Strengths
            </h2>

            <ul className="space-y-2">

              {analysis.strengths.map((item, index) => (
                <li key={index}>⭐ {item}</li>
              ))}

            </ul>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Suggestions
            </h2>

            <ul className="space-y-2">

              {analysis.suggestions.map((item, index) => (
                <li key={index}>💡 {item}</li>
              ))}

            </ul>

          </div>

        </div>

      </div>

    </main>
  );
}