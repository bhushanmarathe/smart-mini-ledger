import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import SummaryCard from "../components/SummaryCard";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import CashFlowChart from "../components/CashFlowChart";
import ExpensePieChart from "../components/ExpensePieChart";
import FinancialHealth from "../components/FinancialHealth";
import SmartInsights from "../components/SmartInsights";
import SavingsSimulator from "../components/SavingsSimulator";
import TransactionFilters from "../components/TransactionFilters";

import {
  deleteTransaction,
  getSummary,
  getTransactions,
} from "../services/api";

import type { Summary, Transaction } from "../types/transaction";

import { exportTransactionsToCSV } from "../utils/exportCsv";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("ALL");

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const loadData = async () => {
    try {
      setLoading(true);

      const [transactionsData, summaryData] = await Promise.all([
        getTransactions(),
        getSummary(),
      ]);

      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) return;

    try {
      await deleteTransaction(id);

      toast.success("Transaction deleted successfully");

      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSuccess = async () => {
    setEditingTransaction(null);
    await loadData();
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "ALL" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "ALL" || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))].sort();
  }, [transactions]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">FinTrack AI</h1>

            <p className="text-gray-500">Smart Personal Finance Dashboard</p>
          </div>

          <button
            onClick={() => {
              exportTransactionsToCSV(filteredTransactions);

              toast.success("Transactions exported successfully");
            }}
            className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <SummaryCard title="Income" value={summary.income} color="green" />
          <SummaryCard title="Expense" value={summary.expense} color="red" />
          <SummaryCard title="Balance" value={summary.balance} color="blue" />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <CashFlowChart summary={summary} />
          <ExpensePieChart transactions={transactions} />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <FinancialHealth summary={summary} transactions={transactions} />

          <SmartInsights summary={summary} transactions={transactions} />
        </div>

        <div className="mb-8">
          <SavingsSimulator transactions={transactions} summary={summary} />
        </div>

        <div className="mb-8">
          <TransactionForm
            editingTransaction={editingTransaction}
            onSuccess={handleSuccess}
            onCancel={() => setEditingTransaction(null)}
          />
        </div>

        <TransactionFilters
          search={search}
          setSearch={setSearch}
          type={typeFilter}
          setType={setTypeFilter}
          category={categoryFilter}
          setCategory={setCategoryFilter}
          categories={categories}
          onReset={() => {
            setSearch("");
            setTypeFilter("ALL");
            setCategoryFilter("ALL");
          }}
        />

        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
