// Importa todas as funcionalidades da biblioteca Zod, usada para validação de esquemas
import * as z from "zod";

// Define o esquema de validação para o formulário de transações
export const transactionSchema = z
  .object({
    // Campo de data de vencimento: deve ser uma string não vazia
    due_date: z.string().nonempty("Data de vencimento é obrigatória"),

    // Campo de descrição: deve ser uma string não vazia
    description: z.string().nonempty("Descrição é obrigatória"),

    // Campo de valor total: é convertido para número e deve ser positivo
    total_amount: z.coerce.number().positive("O valor deve ser positivo"),

    // Campo de tipo: deve ser um dos valores definidos ("income" ou "expense")
    type: z.enum(["income", "expense"], {
      required_error: "Tipo é obrigatório",
    }),

    // Campo de recorrência: deve ser um dos valores definidos
    recurrence: z.enum(["one_time", "recurring", "installment"], {
      required_error: "Recorrência é obrigatória",
    }),

    // Campo opcional de total de parcelas (usado apenas se for parcelado)
    total_installments: z.number().optional(),

    // Campo de membro: string não vazia (ID do membro)
    member: z.string().nonempty("Membro é obrigatório"),

    // Campo de tag: string não vazia (ID da tag)
    tag: z.string().nonempty("Tag é obrigatória"),
  })

  // Regras adicionais (refinamento): validações condicionais entre os campos
  .refine(
    (data) =>
      !(
        data.recurrence === "installment" &&
        (!data.total_installments || data.total_installments <= 0)
      ),
    {
      // Mensagem de erro caso a condição acima seja verdadeira
      message: "Número de parcelas é obrigatório para pagamentos parcelados.",
      // Indica qual campo está relacionado com esse erro
      path: ["total_installments"],
    }
  );
