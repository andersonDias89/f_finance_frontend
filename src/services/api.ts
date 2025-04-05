// Importa a biblioteca axios, usada para fazer requisições HTTP (GET, POST, etc.)
import axios from "axios";

// Cria uma instância personalizada do axios com uma configuração base
export const api = axios.create({
  // Define a URL base que será usada em todas as requisições feitas com essa instância
  // Isso evita repetir a URL inteira em cada chamada (ex: "/transactions/")
  baseURL: "http://127.0.0.1:8000/api",
});
