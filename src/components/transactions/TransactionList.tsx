import { useTransactions } from "../../hooks/useTransactions";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableData,
  TypeData,
  StatusCell,
} from "./TransactionsList.styles";

// Labels traduzidos para exibir no status
function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pendente",
    posted: "Registrado",
    cleared: "Concluído",
  };
  return labels[status] || status;
}

export default function TransactionList() {
  const { transactions } = useTransactions();

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Vencimento</TableHeader>
          <TableHeader>Descrição</TableHeader>
          <TableHeader>Valor</TableHeader>
          <TableHeader>Tipo</TableHeader>
          <TableHeader>Recorrência</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Membro</TableHeader>
          <TableHeader>Tag</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableData>{transaction.due_date}</TableData>
            <TableData>{transaction.description}</TableData>
            <TableData>{transaction.total_amount}</TableData>
            <TypeData $type={transaction.type}>
              {transaction.type === "income" ? "Receita" : "Despesa"}
            </TypeData>
            <TableData>{transaction.recurrence}</TableData>
            <StatusCell
              $status={transaction.status as "pending" | "posted" | "cleared"}
            >
              {getStatusLabel(transaction.status)}
            </StatusCell>
            <TableData>{transaction.member_detail?.name}</TableData>
            <TableData>{transaction.tag_detail?.name}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
