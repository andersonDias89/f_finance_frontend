// Define o tipo para um Membro da Família com os campos esperados
export type FamilyMember = {
  id: string; // Identificador único do membro (UUID)
  name: string; // Nome do membro
};

// Define o tipo para uma Tag com os campos esperados
export type Tag = {
  id: string; // Identificador único da tag (UUID)
  name: string; // Nome da tag
};

// Define o tipo de uma Transação conforme ela é recebida da API
export type Transaction = {
  id: string;
  due_date: string;
  description: string;
  total_amount: number;
  type: "income" | "expense";
  recurrence: "one_time" | "recurring" | "installment";
  total_installments?: number;
  status: string;
  created_at: string;
  member: string;
  tag: string;

  // Esses são os campos retornados com detalhes
  member_detail: {
    id: string;
    name: string;
  };
  tag_detail: {
    id: string;
    name: string;
    type: "income" | "expense";
  };
};

// Define o formato dos dados usados no formulário de criação/edição de transação
export type TransactionFormData = {
  due_date: string; // Data de vencimento (formato string ISO, ex: "2025-04-04")
  description: string; // Descrição da transação
  total_amount: number; // Valor total
  type: "income" | "expense"; // Tipo: receita ou despesa
  recurrence: "one_time" | "recurring" | "installment"; // Tipo de recorrência
  total_installments?: number; // Número de parcelas (opcional)
  member: string; // ID do membro da família selecionado
  tag: string; // ID da tag selecionada
};

// Define o tipo exato de dados que será enviado para a API ao criar uma transação
export type TransactionInput = {
  description: string; // Descrição da transação
  total_amount: number; // Valor total
  type: "income" | "expense"; // Tipo: receita ou despesa
  recurrence: "one_time" | "recurring" | "installment"; // Tipo de recorrência
  total_installments?: number; // Número de parcelas (opcional)
  due_date: string; // Data de vencimento
  member: string; // ID do membro da família (não o objeto completo)
  tag: string; // ID da tag (não o objeto completo)
};
