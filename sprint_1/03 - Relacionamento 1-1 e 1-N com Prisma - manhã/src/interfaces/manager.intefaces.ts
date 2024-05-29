import { Manager } from "@prisma/client";

export type ManagerCreate = Omit<Manager, "id" | "createdAt">;

export { Manager };
