import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const transactionSchema = z
  .object({
    due_date: z.string().nonempty("Data de vencimento é obrigatória"),
    description: z.string().nonempty("Descrição é obrigatória"),
    total_amount: z.number().positive("O valor deve ser positivo"),
    type: z.enum(["income", "expense"], {
      required_error: "Tipo é obrigatório",
    }),
    recurrence: z.enum(["one_time", "recurring", "installment"], {
      required_error: "Recorrência é obrigatória",
    }),
    total_installments: z.number().optional(),
    member: z.string().nonempty("Membro é obrigatório"),
    tag: z.string().nonempty("Tag é obrigatória"),
    status: z.enum(["pending", "posted", "cleared"], {
      required_error: "Status é obrigatório",
    }),
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

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const [members, setMembers] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [membersRes, tagsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/family-members/"),
          axios.get("http://127.0.0.1:8000/api/tags/"),
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
      console.log("Dados enviados:", data); // Verifica os dados antes do envio

      const response = await axios.post(
        "http://127.0.0.1:8000/api/transactions/",
        data
      );

      console.log("Resposta da API:", response.data); // Verifica a resposta da API

      alert("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação", error);
      alert("Erro ao criar transação");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
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
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <p>{errors.type?.message}</p>

      <label>Recorrência:</label>
      <select {...register("recurrence")}>
        <option value="">Selecione...</option>
        <option value="one_time">One-Time</option>
        <option value="recurring">Recurring</option>
        <option value="installment">Installment</option>
      </select>
      <p>{errors.recurrence?.message}</p>

      <label>Membro:</label>
      <select {...register("member")}>
        <option value="">Selecione um membro</option>
        {members.map((member: any) => (
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
      />
      <p>{errors.total_installments?.message}</p>

      <label>Tag:</label>
      <select {...register("tag")}>
        <option value="">Selecione uma tag</option>
        {tags.map((tag: any) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
      {errors.tag && <p>{errors.tag.message}</p>}

      <label>Status:</label>
      <select {...register("status")}>
        <option value="">Selecione...</option>
        <option value="pending">Pending</option>
        <option value="posted">Posted</option>
        <option value="cleared">Cleared</option>
      </select>
      <p>{errors.status?.message}</p>

      <button type="submit">Salvar</button>
    </form>
  );
}
