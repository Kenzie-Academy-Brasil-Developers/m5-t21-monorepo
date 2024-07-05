import { LoanStatus } from "@prisma/client";
import { z } from "zod";

export const loanSchema = z.object({
  id: z.number().int().positive(),
  loanDate: z.date(),
  returnDate: z.date(),
  status: z.nativeEnum(LoanStatus),
  amount: z.number().int().positive(),
  bookId: z.number().int().positive(),
  memberId: z.number().int().positive(),
});

export const loanCreateSchema = loanSchema.omit({ id: true });
