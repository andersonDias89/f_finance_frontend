import { Link } from "react-router-dom";
import { SidebarContainer, NavList, NavItem } from "./Sidebar.styles";

export default function Sidebar() {
  return (
    <SidebarContainer>
      <NavList>
        <NavItem>
          <Link to="/movimentacoes">Movimentações</Link>
        </NavItem>
        <NavItem>
          <Link to="/teste">Teste</Link>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
}
