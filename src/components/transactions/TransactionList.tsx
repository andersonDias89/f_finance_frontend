import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionList() {
  const { transactions } = useTransactions();

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          {transaction.description} - {transaction.total_amount}
        </li>
      ))}
    </ul>
  );
}
