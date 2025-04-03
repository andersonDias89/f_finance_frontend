import * as z from "zod";

export const transactionSchema = z
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
    (data) =>
      !(
        data.recurrence === "installment" &&
        (!data.total_installments || data.total_installments <= 0)
      ),
    {
      message: "Número de parcelas é obrigatório para pagamentos parcelados.",
      path: ["total_installments"],
    }
  );
