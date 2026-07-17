import { Search, RotateCcw } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  type: string;
  setType: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  categories: string[];

  onReset: () => void;
}

export default function TransactionFilters({
  search,
  setSearch,
  type,
  setType,
  category,
  setCategory,
  categories,
  onReset,
}: Props) {
  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="ALL">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="ALL">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-100"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}
