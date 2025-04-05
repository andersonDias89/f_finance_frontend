// styles.ts
import styled from "styled-components";

interface TypeProps {
  $type: "income" | "expense";
}

interface StatusProps {
  $status: "posted" | "pending" | "cleared";
}

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(158, 61, 61, 0.05);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const TableHead = styled.thead`
  background-color: rgb(41, 99, 157);
`;

export const TableHeader = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: rgb(255, 255, 255);
  border-bottom: 1px solid #dee2e6;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
    cursor: pointer;
  }
`;

export const TableData = styled.td`
  padding: 14px 20px;
  font-size: 14px;
  color: #343a40;
  border-bottom: 1px solid #dee2e6;
`;

export const TypeData = styled.td<TypeProps>`
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #dee2e6;
  color: ${({ $type }) => ($type === "income" ? "#2e7d32" : "#c62828")};
`;

const statusColors = {
  pending: {
    text: "#f57c00", // laranja claro
    dot: "#ef6c00", // laranja escuro
  },
  posted: {
    text: "#757575", // cinza claro
    dot: "#424242", // cinza escuro
  },
  cleared: {
    text: "#388e3c", // verde claro
    dot: "#2e7d32", // verde escuro
  },
};

export const StatusCell = styled.td<StatusProps>`
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $status }) => statusColors[$status].text};

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $status }) => statusColors[$status].dot};
    display: inline-block;
  }
`;
