import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

export default function ExpensePieChart({ transactions }: Props) {
  const expenseMap = new Map<string, number>();

  transactions
    .filter((t) => t.type === "EXPENSE")
    .forEach((t) => {
      expenseMap.set(
        t.category,
        (expenseMap.get(t.category) || 0) + Number(t.amount),
      );
    });

  const data = Array.from(expenseMap.entries()).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Expense Breakdown</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} label dataKey="value">
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
