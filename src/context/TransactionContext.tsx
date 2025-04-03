import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Transaction,
  FamilyMember,
  Tag,
  TransactionInput,
} from "../types/transactionTypes";

type TransactionsContextType = {
  transactions: Transaction[];
  members: FamilyMember[];
  tags: Tag[];
  addTransaction: (data: TransactionInput) => Promise<void>; // 🛠 Alterado aqui!
};

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactionsRes, membersRes, tagsRes] = await Promise.all([
          api.get<Transaction[]>("/transactions/"),
          api.get<FamilyMember[]>("/family-members/"),
          api.get<Tag[]>("/tags/"),
        ]);

        setTransactions(transactionsRes.data);
        setMembers(membersRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }
    fetchData();
  }, []);

  async function addTransaction(data: TransactionInput) {
    // 🛠 Alterado aqui!
    try {
      const response = await api.post<Transaction>("/transactions/", data);
      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, members, tags, addTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
