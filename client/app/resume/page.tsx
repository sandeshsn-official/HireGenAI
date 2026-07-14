"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Resume {
  _id: string;
  filename: string;
  originalName: string;
  createdAt: string;
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resume",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes(res.data.resumes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume uploaded successfully");

      setFile(null);

      fetchResumes();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Resume Upload
        </h1>

        <label className="block text-lg font-semibold text-gray-800 mb-3">
          Select Resume (PDF)
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="
            block
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            text-black
            p-3
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-blue-600
            file:px-5
            file:py-2
            file:text-white
            file:font-semibold
            hover:file:bg-blue-700
            cursor-pointer
          "
        />

        {file && (
          <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-3">
            <p className="text-green-700 font-semibold">
              Selected File
            </p>

            <p className="text-gray-800 mt-1">
              {file.name}
            </p>
          </div>
        )}

        <button
          onClick={uploadResume}
          disabled={loading}
          className="
            mt-8
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            font-semibold
            text-lg
            hover:bg-blue-700
            transition
            disabled:bg-gray-400
          "
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        <hr className="my-10" />

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          My Uploaded Resumes
        </h2>

        {resumes.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No resumes uploaded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {resumes.map((resume) => (

              <div
                key={resume._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    📄 {resume.originalName}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Uploaded:
                    {" "}
                    {new Date(
                      resume.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="flex gap-3">

                  <a
                    href={`http://localhost:5000/uploads/${resume.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    View
                  </a>

                  <a
                    href={`http://localhost:5000/uploads/${resume.filename}`}
                    download
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Download
                  </a>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}