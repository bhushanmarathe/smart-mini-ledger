import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createTransaction, updateTransaction } from "../services/api";
import type { CreateTransaction, Transaction } from "../types/transaction";

const categories = [
  "Salary",
  "Freelance",
  "Business",
  "Food",
  "Groceries",
  "Shopping",
  "Rent",
  "Utilities",
  "Transportation",
  "Healthcare",
  "Entertainment",
  "Travel",
  "Education",
  "Investment",
  "Other",
];

interface Props {
  editingTransaction: Transaction | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TransactionForm({
  editingTransaction,
  onSuccess,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransaction>();

  useEffect(() => {
    if (editingTransaction) {
      reset({
        title: editingTransaction.title,
        amount: Number(editingTransaction.amount),
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date.split("T")[0],
      });
    } else {
      reset({
        title: "",
        amount: 0,
        type: "EXPENSE",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingTransaction, reset]);

  const onSubmit = async (data: CreateTransaction) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, data);
        toast.success("Transaction updated successfully");
      } else {
        await createTransaction(data);

        toast.success("Transaction added successfully");

        if (data.type === "EXPENSE" && data.amount >= 10000) {
          toast("⚠️ Large expense recorded!");
        }
      }

      reset({
        title: "",
        amount: undefined,
        type: "EXPENSE",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save transaction");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {editingTransaction && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <div>
          <input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="Title"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Amount must be greater than 0",
              },
            })}
            placeholder="Amount"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <select
            {...register("type", {
              required: true,
            })}
            className="w-full rounded-lg border p-3"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        <div>
          <select
            {...register("category", {
              required: "Category is required",
            })}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <input
            type="date"
            {...register("date", {
              required: true,
            })}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400 md:col-span-2"
        >
          {isSubmitting
            ? "Saving..."
            : editingTransaction
              ? "Update Transaction"
              : "Add Transaction"}
        </button>
      </form>

      {Object.keys(errors).length > 0 && (
        <p className="mt-4 text-sm text-red-600">
          Please fill in all required fields.
        </p>
      )}
    </div>
  );
}
