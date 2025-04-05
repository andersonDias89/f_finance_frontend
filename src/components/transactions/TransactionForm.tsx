// Importa o hook useEffect do React
import { useEffect } from "react";

// Importa os hooks do React Hook Form
import { useForm } from "react-hook-form";

// Permite usar schemas do Zod como validador no React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

// Schema de validação para a transação
import { transactionSchema } from "../../schemas/transactionSchema";

// Tipagem dos dados que o formulário irá manipular
import { TransactionFormData } from "../../types/transactionTypes";

// Hook customizado que fornece dados e ações relacionadas a transações
import { useTransactions } from "../../hooks/useTransactions";

// Componente que lista transações cadastradas
import TransactionList from "./TransactionList";

// Componente de formulário de transações
export default function TransactionForm() {
  // Inicializa o formulário com as configurações e validação via Zod
  const {
    register, // Registra os inputs no hook form
    handleSubmit, // Envolve a função de submit para lidar com validação
    watch, // Observa o valor de campos do formulário em tempo real
    setValue, // Permite alterar valores de campos manualmente
    formState: { errors }, // Contém os erros de validação
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema), // Usa o schema para validar
  });

  // Desestrutura do hook customizado os dados necessários
  const { members, tags, addTransaction } = useTransactions();

  // Observa o valor do campo de recorrência para uso condicional
  const recurrence = watch("recurrence");

  // Quando o campo "recurrence" mudar para "one_time" ou "recurring", limpa o campo de parcelas
  useEffect(() => {
    if (recurrence === "one_time" || recurrence === "recurring") {
      setValue("total_installments", undefined);
    }
  }, [recurrence, setValue]);

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: TransactionFormData) => {
    console.log("Dados enviados:", data);

    try {
      // Envia os dados para o backend com os IDs de membro e tag
      await addTransaction({
        ...data,
        member: data.member, // Apenas o ID do membro
        tag: data.tag, // Apenas o ID da tag
      });

      alert("Transação criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar transação. Veja o console.");
      console.error(error); // Mostra o erro no console para debug
    }
  };

  return (
    <div>
      {/* Formulário de transação */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Descrição:</label>
        <input {...register("description")} />
        <p>{errors.description?.message}</p> {/* Erro de validação */}
        <label>Valor:</label>
        <input
          type="number"
          {...register("total_amount", { valueAsNumber: true })} // Converte o valor para número
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
        {/* Se a recorrência for "installment", mostra o campo de parcelas */}
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
          {/* Mapeia os membros da família para opções do select */}
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
          {/* Mapeia as tags disponíveis para opções do select */}
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <p>{errors.tag?.message}</p>
        <button type="submit">Salvar</button>
      </form>

      {/* Lista de transações abaixo do formulário */}
      <h2>Lista de Transações</h2>
      <TransactionList />
    </div>
  );
}
