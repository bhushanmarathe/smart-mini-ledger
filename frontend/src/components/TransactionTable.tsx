import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: Props) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <div className="mb-4 text-5xl">🔍</div>

        <h3 className="text-xl font-semibold text-gray-800">
          No matching transactions found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const amount = Number(transaction.amount);

              return (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{transaction.title}</td>

                  <td className="p-4">{transaction.category}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.type === "INCOME"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      transaction.type === "INCOME"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "INCOME" ? "+" : "-"} ₹
                    {amount.toLocaleString()}
                  </td>

                  <td className="p-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {transactions.map((transaction) => {
          const amount = Number(transaction.amount);

          return (
            <div key={transaction.id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{transaction.title}</h3>

                  <p className="text-sm text-gray-500">
                    {transaction.category}
                  </p>
                </div>

                <p
                  className={`font-semibold ${
                    transaction.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "INCOME" ? "+" : "-"} ₹
                  {amount.toLocaleString()}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(transaction.date).toLocaleDateString()}</span>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    transaction.type === "INCOME"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="flex-1 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(transaction.id)}
                  className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
