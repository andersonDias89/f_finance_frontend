export type FamilyMember = { id: string; name: string };
export type Tag = { id: string; name: string };
export type Transaction = {
  id: string;
  description: string;
  total_amount: number;
  type: "income" | "expense";
  recurrence: "one_time" | "recurring" | "installment";
  status: "pending" | "posted" | "cleared";
  member: FamilyMember;
  tag: Tag;
};
export type TransactionFormData = {
  due_date: string;
  description: string;
  total_amount: number;
  type: "income" | "expense";
  recurrence: "one_time" | "recurring" | "installment";
  total_installments?: number;
  member: string;
  tag: string;
};

export type TransactionInput = {
  description: string;
  total_amount: number;
  type: "income" | "expense";
  recurrence: "one_time" | "recurring" | "installment";
  total_installments?: number;
  due_date: string;
  member: string; // Aqui é só o ID do membro
  tag: string; // Aqui é só o ID da tag
};
