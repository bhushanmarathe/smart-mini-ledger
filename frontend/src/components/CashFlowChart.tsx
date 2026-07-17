import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import type { Summary } from "../types/transaction";

interface Props {
  summary: Summary;
}

export default function CashFlowChart({ summary }: Props) {
  const data = [
    {
      name: "Income",
      amount: summary.income,
    },
    {
      name: "Expense",
      amount: summary.expense,
    },
    {
      name: "Balance",
      amount: summary.balance,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Cash Flow</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
