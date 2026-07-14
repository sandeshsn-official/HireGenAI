"use client";

import Link from "next/link";

interface Props {
  title: string;
  description: string;
  emoji: string;
  href: string;
}

export default function DashboardCard({
  title,
  description,
  emoji,
  href,
}: Props) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer h-full">

        <div className="text-5xl">
          {emoji}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-4">
          {title}
        </h2>

        <p className="text-gray-600 mt-2">
          {description}
        </p>

      </div>
    </Link>
  );
}