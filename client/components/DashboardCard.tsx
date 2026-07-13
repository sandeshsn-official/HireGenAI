interface Props {
  title: string;
  description: string;
  emoji: string;
}

export default function DashboardCard({
  title,
  description,
  emoji,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition">
      <div className="text-5xl">{emoji}</div>

      <h2 className="text-2xl font-bold text-gray-900 mt-4">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
}