import { HeaderContainer, UserInfo, Avatar } from "./Header.styles";

export default function Header() {
  return (
    <HeaderContainer>
      <UserInfo>
        <span>João Silva</span>
        <Avatar>JS</Avatar>
      </UserInfo>
    </HeaderContainer>
  );
}
