import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: 0.3s;
  }

  button:hover {
    opacity: 0.8;
  }

  ul {
    list-style: none;
  }
`;
