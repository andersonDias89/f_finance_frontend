import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((response) => response.json())
      .then((data: { message: string }) => setMessage(data.message))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);
  return (
    <>
      <div>
        <h1>Conexão Django + React</h1>
        <p>{message}</p>
      </div>
    </>
  );
}

export default App;
