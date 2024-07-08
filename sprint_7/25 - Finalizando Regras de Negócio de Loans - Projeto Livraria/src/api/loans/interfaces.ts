import { z } from "zod";
import { loanCreateSchema, loanSchema } from "./schemas";

export type Loan = z.infer<typeof loanSchema>;
export type LoanCreate = z.infer<typeof loanCreateSchema>;

export interface ILoanService {
  create: (payload: LoanCreate) => Promise<Loan>;
}
