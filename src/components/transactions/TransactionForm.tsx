import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../../schemas/transactionSchema";
import { TransactionFormData } from "../../types/transactionTypes";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionList from "./TransactionList";

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const { members, tags, addTransaction } = useTransactions();
  const recurrence = watch("recurrence");

  // Atualiza total_installments caso a recorrência mude
  useEffect(() => {
    if (recurrence === "one_time" || recurrence === "recurring") {
      setValue("total_installments", undefined);
    }
  }, [recurrence, setValue]);

  const onSubmit = async (data: TransactionFormData) => {
    console.log("Dados enviados:", data);

    try {
      await addTransaction({
        ...data,
        member: data.member, // Mantém apenas o ID
        tag: data.tag, // Mantém apenas o ID
      });

      alert("Transação criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar transação. Veja o console.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Descrição:</label>
        <input {...register("description")} />
        <p>{errors.description?.message}</p>

        <label>Valor:</label>
        <input
          type="number"
          {...register("total_amount", { valueAsNumber: true })}
        />
        <p>{errors.total_amount?.message}</p>

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

        {recurrence === "installment" && (
          <>
            <label>Total de Parcelas:</label>
            <input
              type="number"
              {...register("total_installments", { valueAsNumber: true })}
            />
            <p>{errors.total_installments?.message}</p>
          </>
        )}

        <label>Membro:</label>
        <select {...register("member")}>
          <option value="">Selecione um membro</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <p>{errors.member?.message}</p>

        <label>Tag:</label>
        <select {...register("tag")}>
          <option value="">Selecione uma tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <p>{errors.tag?.message}</p>

        <button type="submit">Salvar</button>
      </form>
      <h2>Lista de Transações</h2>
      <TransactionList />
    </div>
  );
}
