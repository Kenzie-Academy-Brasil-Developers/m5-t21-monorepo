import { LoanStatus } from "@prisma/client";
import { z } from "zod";

export const loanSchema = z.object({
  id: z.number().int().positive(),
  // Data entra como string, mas o prisma precisa de um objeto DATE
  // o coerce do zod faz a coerção da string de data valida para um obj date.
  loanDate: z.coerce.date().default(new Date()),
  returnDate: z.coerce.date(),
  status: z.nativeEnum(LoanStatus).default(LoanStatus.ACTIVE),
  amount: z.number().int().positive(),
  bookId: z.number().int().positive(),
  memberId: z.number().int().positive(),
});

export const loanCreateSchema = loanSchema.omit({ id: true, status: true });
