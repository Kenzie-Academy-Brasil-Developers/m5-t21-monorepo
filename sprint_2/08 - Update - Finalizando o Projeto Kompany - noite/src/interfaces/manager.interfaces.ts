import { z } from "zod";
import {
  managerCreateSchema,
  managerSchema,
  managerUpdateSchema,
} from "../schemas";

export type Manager = z.infer<typeof managerSchema>;
export type ManagerCreate = z.infer<typeof managerCreateSchema>;

// export type ManagerUpdate = Partial<ManagerCreate>
export type ManagerUpdate = z.infer<typeof managerUpdateSchema>;
