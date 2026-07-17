import { useMemo, useState, useEffect } from "react";
import type { Summary, Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  summary: Summary;
}

export default function SavingsSimulator({ transactions, summary }: Props) {
  const expenseCategories = useMemo(() => {
    const map = new Map<string, number>();

    transactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) || 0) + Number(t.amount));
      });

    return Array.from(map.entries());
  }, [transactions]);

  const [category, setCategory] = useState(expenseCategories[0]?.[0] || "");

  const [percentage, setPercentage] = useState(10);

  useEffect(() => {
    if (
      expenseCategories.length > 0 &&
      !expenseCategories.some(([name]) => name === category)
    ) {
      setCategory(expenseCategories[0][0]);
    }
  }, [expenseCategories, category]);

  const currentExpense =
    expenseCategories.find((c) => c[0] === category)?.[1] || 0;

  const monthlySavings = currentExpense * (percentage / 100);

  const yearlySavings = monthlySavings * 12;

  const projectedBalance = summary.balance + monthlySavings;

  const projectedSavingsRate =
    summary.income === 0 ? 0 : (projectedBalance / summary.income) * 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">💰 Savings Simulator</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={expenseCategories.length === 0}
            className="w-full rounded-lg border p-3 disabled:bg-gray-100"
          >
            {expenseCategories.length === 0 ? (
              <option>No expense categories</option>
            ) : (
              expenseCategories.map(([name]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            )}
          </select>

          <p className="mt-2 text-sm text-gray-500">
            Current monthly spending in {category}:{" "}
            <span className="font-semibold text-black">
              ₹{currentExpense.toLocaleString()}
            </span>
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Reduce spending by
          </label>

          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full"
          />

          <p className="mt-2 font-medium">{percentage}%</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm text-gray-500">Monthly Savings</p>

            <p className="mt-2 text-2xl font-bold text-green-700">
              ₹{monthlySavings.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-gray-500">Yearly Savings</p>

            <p className="mt-2 text-2xl font-bold text-blue-700">
              ₹{yearlySavings.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
          <h3 className="font-semibold">Projected Financial Health</h3>

          <p className="mt-3">
            New Balance:
            <span className="ml-2 font-semibold">
              ₹{projectedBalance.toLocaleString()}
            </span>
          </p>

          <p className="mt-2">
            Savings Rate:
            <span className="ml-2 font-semibold">
              {projectedSavingsRate.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
