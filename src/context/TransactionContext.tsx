// Importa as ferramentas do React necessárias para contexto e estado
import { createContext, useEffect, useState } from "react";

// Importa o serviço de API configurado (axios)
import { api } from "../services/api";

// Importa os tipos que serão usados para tipar os dados
import {
  Transaction,
  FamilyMember,
  Tag,
  TransactionInput,
} from "../types/transactionTypes";

// Define o formato dos dados que o contexto vai disponibilizar
type TransactionsContextType = {
  transactions: Transaction[]; // Lista de transações cadastradas
  members: FamilyMember[]; // Lista de membros da família
  tags: Tag[]; // Lista de tags
  addTransaction: (data: TransactionInput) => Promise<void>; // Função para adicionar uma nova transação
};

// Cria o contexto com o tipo definido acima
// Inicialmente o valor é undefined, pois será preenchido pelo provider
export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

// Componente provider que envolve a aplicação para fornecer o contexto
export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode; // Os componentes filhos que terão acesso ao contexto
}) {
  // Estado para armazenar a lista de transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Estado para armazenar a lista de membros da família
  const [members, setMembers] = useState<FamilyMember[]>([]);

  // Estado para armazenar a lista de tags
  const [tags, setTags] = useState<Tag[]>([]);

  // useEffect é usado para buscar os dados da API quando o componente for montado
  useEffect(() => {
    async function fetchData() {
      try {
        // Faz as três requisições em paralelo (transações, membros e tags)
        const [transactionsRes, membersRes, tagsRes] = await Promise.all([
          api.get<Transaction[]>("/transactions/"), // Busca transações
          api.get<FamilyMember[]>("/family-members/"), // Busca membros
          api.get<Tag[]>("/tags/"), // Busca tags
        ]);

        // Atualiza os estados com os dados vindos da API
        setTransactions(transactionsRes.data);
        setMembers(membersRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        // Caso ocorra algum erro, mostra no console
        console.error("Erro ao buscar dados", error);
      }
    }

    // Chama a função ao montar o componente
    fetchData();
  }, []);

  // Função que envia uma nova transação para a API
  async function addTransaction(data: TransactionInput) {
    try {
      // Envia os dados para o backend via POST
      const response = await api.post<Transaction>("/transactions/", data);

      // Atualiza o estado adicionando a nova transação à lista existente
      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      // Caso dê erro ao criar, exibe no console
      console.error("Erro ao criar transação", error);
    }
  }

  // Retorna o provider com os valores disponíveis para qualquer componente que estiver dentro dele
  return (
    <TransactionsContext.Provider
      value={{ transactions, members, tags, addTransaction }} // Expondo os dados e funções
    >
      {children} {/* Renderiza os componentes filhos dentro do contexto */}
    </TransactionsContext.Provider>
  );
}
