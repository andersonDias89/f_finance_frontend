import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Teste from "./pages/Teste"; // Importando a nova página
import { TransactionsProvider } from "./context/TransactionContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header"; // Importando o Header
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  margin-top: 60px; /* Adiciona espaço abaixo do Header */
`;

const Content = styled.div`
  margin-left: 250px; /* Ajuste conforme o tamanho do Sidebar */
  padding: 20px;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TransactionsProvider>
        <Router>
          <Header /> {/* Header global */}
          <Layout>
            <Sidebar />
            <Content>
              <Routes>
                <Route path="/movimentacoes" element={<Transactions />} />
                <Route path="/teste" element={<Teste />} />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </TransactionsProvider>
    </ThemeProvider>
  );
}

export default App;
