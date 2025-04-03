// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import { TransactionsProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionsProvider>
      <Router>
        <Routes>
          <Route path="/movimentacoes" element={<Transactions />} />
        </Routes>
      </Router>
    </TransactionsProvider>
  );
}

export default App;
