import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import { TransactionsProvider } from "./context/TransactionContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components"; // ✅ Importação correta

function App() {
  return (
    <TransactionsProvider>
      <ThemeProvider theme={theme}>
        {" "}
        {/* ✅ ThemeProvider deve envolver a aplicação */}
        <>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path="/movimentacoes" element={<Transactions />} />
            </Routes>
          </Router>
        </>
      </ThemeProvider>
    </TransactionsProvider>
  );
}

export default App;
