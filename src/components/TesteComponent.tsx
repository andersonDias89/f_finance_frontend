import GenericTable from "../components/Table/GenericTable";
import { TableData } from "../components/Table/GenericTable.styles";

// 1. Dados fictícios
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    role: "Administrador",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    role: "Financeiro",
    status: "Inativo",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    role: "Usuário",
    status: "Ativo",
  },
];

// 2. Cabeçalhos da tabela
const headers = ["Nome", "Email", "Cargo", "Status"];

export default function TesteComponent() {
  return (
    <GenericTable
      headers={headers}
      data={users}
      renderRow={(user) => (
        <>
          <TableData>{user.name}</TableData>
          <TableData>{user.email}</TableData>
          <TableData>{user.role}</TableData>
          <TableData>{user.status}</TableData>
        </>
      )}
    />
  );
}
