// Importações do React Router DOM para configurar as rotas
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa as páginas que serão usadas nas rotas
import Transactions from "./pages/Transactions";
import Teste from "./pages/Teste"; // Importando a nova página

// Importa o Provider que fornece o contexto de transações para toda a aplicação
import { TransactionsProvider } from "./context/TransactionContext";

// Estilos globais e tema da aplicação
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

// ThemeProvider do styled-components para usar o tema em toda a aplicação
import { ThemeProvider } from "styled-components";

// Componentes de layout
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header"; // Importando o Header

// Importa o styled-components para criar estilos customizados
import styled from "styled-components";

// Componente de layout principal com `flex`, colocando o Sidebar e o conteúdo lado a lado
// Adiciona margem no topo para não sobrepor o Header
const Layout = styled.div`
  display: flex;
  margin-top: 60px; /* Adiciona espaço abaixo do Header */
`;

// Estilo para a área principal de conteúdo
// Adiciona espaço à esquerda para o Sidebar e padding interno
const Content = styled.div`
  margin-left: 250px; /* Ajuste conforme o tamanho do Sidebar */
  padding: 20px;
  width: 100%;
`;

// Componente principal da aplicação
function App() {
  return (
    // Aplica o tema definido via styled-components em toda a aplicação
    <ThemeProvider theme={theme}>
      {/* Aplica os estilos globais (ex: reset de CSS, fonte, etc) */}
      <GlobalStyles />

      {/* Fornece os dados e funções do contexto de transações para todos os componentes */}
      <TransactionsProvider>
        {/* Define o roteamento da aplicação */}
        <Router>
          {/* Cabeçalho global, fixo no topo da aplicação */}
          <Header />

          {/* Layout principal com Sidebar e conteúdo */}
          <Layout>
            {/* Menu lateral fixo */}
            <Sidebar />

            {/* Área onde as páginas são renderizadas conforme a rota */}
            <Content>
              <Routes>
                {/* Rota para a página de movimentações */}
                <Route path="/movimentacoes" element={<Transactions />} />

                {/* Rota para a página de teste */}
                <Route path="/teste" element={<Teste />} />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </TransactionsProvider>
    </ThemeProvider>
  );
}

// Exporta o componente App como padrão
export default App;
