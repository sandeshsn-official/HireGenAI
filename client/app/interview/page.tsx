"use client";

import { useState } from "react";
import axios from "axios";

export default function InterviewPage() {
  const [role, setRole] = useState("Data Scientist");
  const [level, setLevel] = useState("Fresher");
  const [type, setType] = useState("Technical");

  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState<any>(null);
    const [review, setReview] = useState<any>(null);
const [reviewLoading, setReviewLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const generateQuestion = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/interview/generate",
        {
          role,
          level,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterview(res.data.interview);

    } catch (err) {
      console.error(err);
      alert("Failed to generate interview question");
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
  if (!answer.trim()) {
    alert("Please type your answer first.");
    return;
  }

  try {
    setReviewLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/interview/review",
      {
        question: interview.question,
        answer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setReview(res.data.review);

  } catch (err) {
    console.error(err);
    alert("Interview evaluation failed");
  } finally {
    setReviewLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          AI Mock Interview
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div>

            <label className="font-semibold">
              Role
            </label>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 p-3 rounded border"
            />

          </div>

          <div>

            <label className="font-semibold">
              Experience
            </label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mt-2 p-3 rounded border"
            >
              <option>Fresher</option>
              <option>Junior</option>
              <option>Mid-Level</option>
              <option>Senior</option>
            </select>

          </div>

          <div>

            <label className="font-semibold">
              Interview Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 p-3 rounded border"
            >
              <option>Technical</option>
              <option>HR</option>
              <option>Behavioral</option>
            </select>

          </div>

        </div>

        <button
          onClick={generateQuestion}
          disabled={loading}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Interview Question"}
        </button>

        {interview && (

          <div className="mt-10 bg-gray-50 rounded-xl p-8">

            <h2 className="text-3xl font-bold text-blue-700">
              Interview Question
            </h2>

            <p className="mt-6 text-lg">
              {interview.question}
            </p>

            <div className="mt-8">

              <h3 className="text-xl font-bold">
                Expected Points
              </h3>

              <ul className="list-disc ml-6 mt-3">

                {interview.expectedPoints.map(
                  (point: string, index: number) => (
                    <li key={index}>
                      {point}
                    </li>
                  )
                )}

              </ul>

                <div className="mt-10">

  <h3 className="text-2xl font-bold">
    Your Answer
  </h3>

  <textarea
    rows={10}
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    className="w-full mt-4 border rounded-lg p-4"
    placeholder="Type your interview answer here..."
  />
    <button
  onClick={evaluateAnswer}
  disabled={reviewLoading}
  className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
>
  {reviewLoading ? "Evaluating..." : "Evaluate Answer"}
</button>

{review && (

<div className="mt-10 bg-white border rounded-xl shadow-lg p-8">

<h2 className="text-3xl font-bold text-blue-700 mb-6">
AI Interview Evaluation
</h2>

<div className="grid grid-cols-2 gap-6">

<div className="bg-green-100 p-5 rounded-lg">
<h3 className="font-bold">⭐ Overall Score</h3>
<p className="text-5xl font-bold mt-2">
{review.score}/100
</p>
</div>

<div className="bg-blue-100 p-5 rounded-lg">
<h3 className="font-bold">💬 Communication</h3>
<p>{review.communication}</p>
</div>

<div className="bg-yellow-100 p-5 rounded-lg">
<h3 className="font-bold">🧠 Technical Knowledge</h3>
<p>{review.technicalKnowledge}</p>
</div>

<div className="bg-purple-100 p-5 rounded-lg">
<h3 className="font-bold">🎯 Confidence</h3>
<p>{review.confidence}</p>
</div>

</div>

<div className="mt-8">

<h3 className="text-2xl font-bold">
Strengths
</h3>

<ul className="list-disc ml-6 mt-3">

{review.strengths.map(
(item: string, index: number) => (
<li key={index}>{item}</li>
)
)}

</ul>

</div>

<div className="mt-8">

<h3 className="text-2xl font-bold">
Improvements
</h3>

<ul className="list-disc ml-6 mt-3">

{review.improvements.map(
(item: string, index: number) => (
<li key={index}>{item}</li>
)
)}

</ul>

</div>

</div>

)}
</div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}