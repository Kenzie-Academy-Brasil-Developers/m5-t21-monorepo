import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Manager, ManagerCreate } from "../interfaces";

export class ManagerService {
  public create = async (payload: ManagerCreate): Promise<Manager> => {
    return await prisma.manager.create({ data: payload });
  };

  public findAll = async (): Promise<Manager[]> => {
    // SELECT * FROM "Manager";
    return await prisma.manager.findMany();
  };

  public findOne = async (managerId: number): Promise<Manager | null> => {
    const manager = await prisma.manager.findUnique({
      where: { id: managerId },
    });

    if (!manager) {
      throw new ApiError("Manager not found", 404);
    }

    return manager;
  };
}
