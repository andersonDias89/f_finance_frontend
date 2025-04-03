import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column; /* Garante que os itens fiquem um abaixo do outro */
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* Ajusta para lista vertical */
  gap: 10px; /* Espaçamento entre os itens */
`;

export const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: block; /* Garante que o link ocupe a linha inteira */

    &:hover {
      text-decoration: underline;
    }
  }
`;
