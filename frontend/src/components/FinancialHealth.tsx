import type { Summary, Transaction } from "../types/transaction";

interface Props {
  summary: Summary;
  transactions: Transaction[];
}

export default function FinancialHealth({ summary, transactions }: Props) {
  const savingsRate =
    summary.income === 0 ? 0 : (summary.balance / summary.income) * 100;

  let score = 50;

  if (savingsRate > 60) score += 30;
  else if (savingsRate > 30) score += 20;
  else if (savingsRate > 10) score += 10;

  if (transactions.length > 10) score += 10;

  if (summary.balance > 0) score += 10;

  score = Math.min(score, 100);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Financial Health</h2>

      <div className="text-6xl font-bold text-blue-600">{score}</div>

      <p className="mt-3 text-gray-500">Health Score</p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <p className="mt-5 text-sm text-gray-500">
        Savings Rate: {savingsRate.toFixed(1)}%
      </p>
    </div>
  );
}
