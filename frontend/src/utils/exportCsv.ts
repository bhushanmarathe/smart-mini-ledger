import type { Transaction } from "../types/transaction";

export function exportTransactionsToCSV(transactions: Transaction[]) {
  if (transactions.length === 0) {
    return;
  }

  const headers = ["Title", "Category", "Type", "Amount", "Date"];

  const rows = transactions.map((transaction) => [
    transaction.title,
    transaction.category,
    transaction.type,
    Number(transaction.amount).toFixed(2),
    new Date(transaction.date).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;

  link.click();

  URL.revokeObjectURL(url);
}
