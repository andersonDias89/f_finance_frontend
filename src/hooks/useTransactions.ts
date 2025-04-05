// Importa o hook useContext do React para acessar o contexto
import { useContext } from "react";

// Importa o contexto que criamos para transações
import { TransactionsContext } from "../context/TransactionContext";

// Cria um hook personalizado para acessar o contexto de transações
export function useTransactions() {
  // Usa o hook useContext para obter o valor do contexto
  const context = useContext(TransactionsContext);

  // Se o contexto for undefined, significa que o hook foi usado fora do provider
  if (!context) {
    // Lança um erro explicando que o hook deve ser usado dentro do TransactionsProvider
    throw new Error(
      "useTransactions deve ser usado dentro de um TransactionsProvider"
    );
  }

  // Retorna o valor do contexto (transactions, members, tags e addTransaction)
  return context;
}
