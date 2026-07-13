import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-6xl font-extrabold text-blue-600">
          HireGenAI
        </h1>

        <p className="mt-6 text-2xl text-gray-700">
          AI Powered Software Engineering Interview Platform
        </p>

        <div className="mt-10 space-y-3 text-lg text-gray-600">
          <p>✅ AI Resume Screening</p>
          <p>✅ Live Coding Assessment</p>
          <p>✅ AI Technical Interview</p>
          <p>✅ Recruiter Dashboard</p>
        </div>

        <div className="mt-12 flex justify-center gap-5">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}