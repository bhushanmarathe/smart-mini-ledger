interface SummaryCardProps {
  title: string;
  value: number;
  color: "green" | "red" | "blue";
}

const colorMap = {
  green: "border-green-500 bg-green-50 text-green-700",
  red: "border-red-500 bg-red-50 text-red-700",
  blue: "border-blue-500 bg-blue-50 text-blue-700",
};

export default function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <div className={`rounded-2xl border-l-4 p-6 shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-medium">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">₹{value.toLocaleString()}</h2>
    </div>
  );
}
