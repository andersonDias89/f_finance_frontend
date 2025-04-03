import styled, { css } from "styled-components";
import { ButtonProps } from "./Button.types";

export const StyledButton = styled.button<{
  $variant?: ButtonProps["variant"];
  $size?: ButtonProps["size"];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) =>
    $size === "large"
      ? "14px 24px"
      : $size === "small"
      ? "8px 16px"
      : "10px 20px"};
  border-radius: 8px;
  font-size: ${({ $size }) =>
    $size === "large" ? "18px" : $size === "small" ? "14px" : "16px"};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  gap: 8px;

  ${({ theme, $variant }) => css`
    background-color: ${theme.colors[$variant || "primary"]};
    color: ${$variant === "outline" ? theme.colors.primary : "#fff"};
    border: ${$variant === "outline"
      ? `2px solid ${theme.colors.primary}`
      : "none"};

    &:hover {
      background-color: ${$variant === "outline"
        ? theme.colors.primary
        : theme.colors.secondary};
      color: #fff;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }
  `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;
