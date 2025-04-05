import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
} from "./GenericTable.styles";

type GenericTableProps<T> = {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
};

export default function GenericTable<T>({
  headers,
  data,
  renderRow,
}: GenericTableProps<T>) {
  return (
    <Table>
      <TableHead>
        <tr>
          {headers.map((header, index) => (
            <TableHeader key={index}>{header}</TableHeader>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>{renderRow(item)}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
