import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionContext";

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions deve ser usado dentro de um TransactionsProvider"
    );
  }
  return context;
}
