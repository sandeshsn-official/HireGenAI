"use client";

import { useState } from "react";
import axios from "axios";
import CodeEditor from "@/components/CodeEditor";

export default function CodingPage() {
  const [language, setLanguage] = useState("Python");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const [code, setCode] = useState("");

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/coding/generate",
        {
          language,
          difficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(res.data.question);
    } catch (error) {
      console.error(error);
      alert("Failed to generate question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          AI Coding Assessment
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Programming Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg border"
            >
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
              <option>JavaScript</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg border"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

        </div>

        <button
          onClick={generateQuestion}
          disabled={loading}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Question"}
        </button>

        {question && (

          <div className="mt-10 border rounded-xl p-6 bg-gray-50">

            <h2 className="text-3xl font-bold text-blue-700">
              {question.title}
            </h2>

            <p className="mt-5 whitespace-pre-line">
              {question.description}
            </p>

            <div className="mt-6">

              <h3 className="font-bold">
                Example Input
              </h3>

              <div className="bg-gray-200 p-3 rounded mt-2">
                {question.input}
              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-bold">
                Example Output
              </h3>

              <div className="bg-gray-200 p-3 rounded mt-2">
                {question.output}
              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-bold">
                Constraints
              </h3>

              <ul className="list-disc ml-6 mt-2">
                {question.constraints.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Write Your Solution
  </h2>

  <CodeEditor
    language={language}
    code={code}
    setCode={setCode}
  />

</div>
            </div>

          </div>

        )}

      </div>

    </main>
  );
}