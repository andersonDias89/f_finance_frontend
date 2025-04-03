import "./App.css";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import { TransactionsProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionsProvider>
      <div>
        <h1>Gerenciamento de Transações</h1>
        <TransactionForm />
        <TransactionList />
      </div>
    </TransactionsProvider>
  );
}

export default App;
