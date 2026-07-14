import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {/* Navigation */}

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">

        <h1 className="text-3xl font-extrabold text-blue-600">
          HireGenAI
        </h1>

        <div className="flex gap-4">

          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-6">
            🚀 AI Recruitment Platform
          </div>

          <h1 className="text-6xl font-extrabold leading-tight text-gray-900">

            Hire Smarter

            <span className="text-blue-600">
              {" "}with AI
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-600 leading-9">

            HireGenAI helps candidates improve resumes,
            practice coding interviews,
            prepare for AI mock interviews,
            and track performance through an intelligent dashboard.

          </p>

          <div className="mt-10 flex gap-5">

            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="grid grid-cols-2 gap-6">

          <FeatureCard
            emoji="📄"
            title="AI Resume Analysis"
            description="Get ATS score, missing skills and resume improvements."
          />

          <FeatureCard
            emoji="💻"
            title="Coding Assessment"
            description="Practice AI-generated coding challenges with instant review."
          />

          <FeatureCard
            emoji="🎤"
            title="AI Mock Interview"
            description="Technical & HR interview preparation with AI feedback."
          />

          <FeatureCard
            emoji="📊"
            title="Dashboard"
            description="Track resume, coding and interview performance."
          />

        </div>

      </div>

      {/* Statistics */}

      <div className="max-w-7xl mx-auto px-8 pb-20">

        <div className="bg-white rounded-3xl shadow-xl grid md:grid-cols-4 text-center">

          <Stat number="3" label="AI Modules" />

          <Stat number="100+" label="Coding Questions" />

          <Stat number="24/7" label="AI Assistance" />

          <Stat number="100%" label="Portfolio Ready" />

        </div>

      </div>

    </section>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">

      <div className="text-5xl">
        {emoji}
      </div>

      <h2 className="mt-5 text-xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

    </div>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="p-10">

      <h2 className="text-5xl font-bold text-blue-600">
        {number}
      </h2>

      <p className="mt-3 text-gray-600">
        {label}
      </p>

    </div>
  );
}