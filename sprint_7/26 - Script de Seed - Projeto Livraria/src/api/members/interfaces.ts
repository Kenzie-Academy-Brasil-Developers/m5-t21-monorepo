import { z } from "zod";
import { memberCreateSchema, memberSchema } from "./schemas";

export type Member = z.infer<typeof memberSchema>;
export type MemberCreate = z.infer<typeof memberCreateSchema>;

export interface IMemberService {
  count: () => Promise<number>;
  create: (payload: MemberCreate) => Promise<Member>;
  list: () => Promise<Member[]>;
  findById: (id: number) => Promise<Member>;
}
