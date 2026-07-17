import type { Summary, Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  summary: Summary;
}

export default function SmartInsights({ transactions, summary }: Props) {
  const expenses = transactions.filter((t) => t.type === "EXPENSE");

  const incomes = transactions.filter((t) => t.type === "INCOME");

  //const totalExpenses = summary.expense;
  const totalIncome = summary.income;

  // Category totals
  const categoryTotals = expenses.reduce(
    (acc, transaction) => {
      const amount = Number(transaction.amount);

      acc[transaction.category] = (acc[transaction.category] || 0) + amount;

      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  );

  const topCategory = sortedCategories[0];

  // Largest expense
  const largestExpense = expenses.reduce<Transaction | null>(
    (largest, current) => {
      if (!largest) return current;

      return Number(current.amount) > Number(largest.amount)
        ? current
        : largest;
    },
    null,
  );

  const savingsRate =
    totalIncome === 0 ? 0 : (summary.balance / totalIncome) * 100;

  const insights: string[] = [];

  if (summary.balance > 0) {
    insights.push(
      `🎉 Great job! You're saving ₹${summary.balance.toLocaleString()}.`,
    );
  } else {
    insights.push("⚠️ Your expenses are higher than your income.");
  }

  if (topCategory) {
    insights.push(
      `💸 Most spending is on ${topCategory[0]} (₹${topCategory[1].toLocaleString()}).`,
    );
  }

  if (largestExpense) {
    insights.push(
      `📌 Largest expense: ${largestExpense.title} (₹${Number(
        largestExpense.amount,
      ).toLocaleString()}).`,
    );
  }

  insights.push(`📈 Savings rate: ${savingsRate.toFixed(1)}%.`);

  insights.push(
    `🧾 ${transactions.length} total transactions (${incomes.length} income, ${expenses.length} expense).`,
  );

  if (savingsRate >= 50) {
    insights.push("✅ Excellent financial discipline! Keep it up.");
  } else if (savingsRate >= 20) {
    insights.push("👍 Healthy savings. Try reducing discretionary spending.");
  } else {
    insights.push(
      "💡 Consider reducing unnecessary expenses to improve savings.",
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">💡 Smart Insights</h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-lg border border-blue-100 bg-blue-50 p-4"
          >
            <p className="text-gray-700">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
