import { z } from "zod";
import {
  accountCreateSchema,
  accountSchema,
  accountUpdateSchema,
} from "./schemas";

export type Account = z.infer<typeof accountSchema>;
export type AccountCreate = z.infer<typeof accountCreateSchema>;
export type AccountUpdate = z.infer<typeof accountUpdateSchema>;
// export type AccountUpdate2 = Partial<AccountCreate>;
