import axios from "axios";
import type { CreateTransaction } from "../types/transaction";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const getTransactions = async () => {
  const { data } = await api.get("/transactions");
  return data;
};

export const getSummary = async () => {
  const { data } = await api.get("/transactions/summary");
  return data;
};

export const createTransaction = async (transaction: CreateTransaction) => {
  const { data } = await api.post("/transactions", transaction);
  return data;
};

export const updateTransaction = async (
  id: string,
  transaction: Partial<CreateTransaction>,
) => {
  const { data } = await api.patch(`/transactions/${id}`, transaction);
  return data;
};

export const deleteTransaction = async (id: string) => {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
};
