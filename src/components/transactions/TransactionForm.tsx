import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Definição do schema para validação com Zod
const transactionSchema = z
  .object({
    due_date: z.string().nonempty("Data de vencimento é obrigatória"),
    description: z.string().nonempty("Descrição é obrigatória"),
    total_amount: z.coerce.number().positive("O valor deve ser positivo"),
    type: z.enum(["income", "expense"], {
      required_error: "Tipo é obrigatório",
    }),
    recurrence: z.enum(["one_time", "recurring", "installment"], {
      required_error: "Recorrência é obrigatória",
    }),
    total_installments: z.number().optional(),
    member: z.string().nonempty("Membro é obrigatório"),
    tag: z.string().nonempty("Tag é obrigatória"),
  })
  .refine(
    (data) => {
      if (
        data.recurrence === "installment" &&
        (!data.total_installments || data.total_installments <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Número de parcelas é obrigatório para pagamentos parcelados.",
      path: ["total_installments"],
    }
  );

type TransactionFormData = z.infer<typeof transactionSchema>;
type FamilyMember = { id: string; name: string };
type Tag = { id: string; name: string };
type Transaction = {
  id: string;
  description: string;
  total_amount: number;
  type: "income" | "expense";
  recurrence: "one_time" | "recurring" | "installment";
  status: "pending" | "posted" | "cleared";
  member: FamilyMember;
  tag: Tag;
};

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const recurrence = watch("recurrence");

  // Atualiza total_installments caso a recorrência mude
  useEffect(() => {
    if (recurrence === "one_time" || recurrence === "recurring") {
      setValue("total_installments", undefined);
    }
  }, [recurrence, setValue]);

  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>(
          "http://127.0.0.1:8000/api/transactions/"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [membersRes, tagsRes] = await Promise.all([
          axios.get<FamilyMember[]>(
            "http://127.0.0.1:8000/api/family-members/"
          ),
          axios.get<Tag[]>("http://127.0.0.1:8000/api/tags/"),
        ]);

        console.log("Membros recebidos:", membersRes.data);
        console.log("Tags recebidas:", tagsRes.data);

        setMembers(membersRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      console.log("Dados enviados:", data);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/transactions/",
        data
      );

      console.log("Resposta da API:", response.data);

      alert("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação", error);
      alert("Erro ao criar transação");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Descrição:</label>
        <input {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}

        <label>Valor:</label>
        <input
          type="number"
          {...register("total_amount", { valueAsNumber: true })}
        />
        {errors.total_amount && <p>{errors.total_amount.message}</p>}

        <label>Data de Vencimento:</label>
        <input type="date" {...register("due_date")} />
        <p>{errors.due_date?.message}</p>

        <label>Tipo:</label>
        <select {...register("type")}>
          <option value="">Selecione...</option>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
        <p>{errors.type?.message}</p>

        <label>Recorrência:</label>
        <select {...register("recurrence")}>
          <option value="">Selecione...</option>
          <option value="one_time">Única</option>
          <option value="recurring">Recorrente</option>
          <option value="installment">Parcelada</option>
        </select>
        <p>{errors.recurrence?.message}</p>

        <label>Membro:</label>
        <select {...register("member")}>
          <option value="">Selecione um membro</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        {errors.member && <p>{errors.member.message}</p>}

        <label>Total de Parcelas:</label>
        <input
          type="number"
          {...register("total_installments", { valueAsNumber: true })}
          disabled={recurrence !== "installment"}
        />
        <p>{errors.total_installments?.message}</p>

        <label>Tag:</label>
        <select {...register("tag")}>
          <option value="">Selecione uma tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tag && <p>{errors.tag.message}</p>}

        <button type="submit">Salvar</button>
      </form>

      <h2>Lista de Transações</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - {transaction.total_amount} -{" "}
            {transaction.member?.name || "Sem membro"} -{" "}
            {transaction.tag?.name || "Sem tag"}
          </li>
        ))}
      </ul>
    </div>
  );
}
