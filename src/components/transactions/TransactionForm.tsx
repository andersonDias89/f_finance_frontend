import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
}

const TransactionForm = () => {
  const [type, setType] = useState("income"); // Tipo da transação
  const [amount, setAmount] = useState(""); // Valor
  const [description, setDescription] = useState(""); // Descrição
  const [message, setMessage] = useState(""); // Mensagem de sucesso/erro
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Lista de transações

  // Função para buscar transações do backend
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/transactions/");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  // Buscar transações quando o componente carregar
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      type,
      amount: parseFloat(amount), // Converter para número
      description,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        setMessage("Transaction created successfully!");
        setAmount("");
        setDescription("");
        fetchTransactions(); // Atualiza a lista após adicionar uma nova transação
      } else {
        setMessage("Error creating transaction.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <h2>Transactions List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <strong>{transaction.type.toUpperCase()}</strong>: $
            {transaction.amount} - {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionForm;
