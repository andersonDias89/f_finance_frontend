import { useTransactions } from "../../hooks/useTransactions";
import GenericTable from "../Table/GenericTable";
import {
  TableData,
  TypeData,
  StatusCell,
} from "../../components/Table/GenericTable.styles"; // ou onde você mantiver

const headers = [
  "Vencimento",
  "Descrição",
  "Valor",
  "Tipo",
  "Recorrência",
  "Status",
  "Membro",
  "Tag",
];

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
    <GenericTable
      headers={headers}
      data={transactions}
      renderRow={(transaction) => (
        <>
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
        </>
      )}
    />
  );
}
