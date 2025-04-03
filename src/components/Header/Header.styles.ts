import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: calc(100% - 250px); /* Reduzindo a largura para considerar o Sidebar */
  height: 60px;
  background: #34495e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 250px; /* Movendo o header para a direita, depois do Sidebar */
  z-index: 1000;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34495e;
  font-weight: bold;
  font-size: 18px;
`;
