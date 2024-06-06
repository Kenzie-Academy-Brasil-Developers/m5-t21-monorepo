// import { Manager } from "@prisma/client";
// export type ManagerCreate = Omit<Manager, "id" | "createdAt">;
// export { Manager };
import { z } from "zod";
import { managerCreateSchema, managerSchema } from "../schemas";

export type Manager = z.infer<typeof managerSchema>;
export type ManagerCreate = z.infer<typeof managerCreateSchema>;
