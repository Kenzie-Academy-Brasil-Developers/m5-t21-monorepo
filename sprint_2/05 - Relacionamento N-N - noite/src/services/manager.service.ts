import { Manager, ManagerCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors";

export class ManagerService {
  public create = async (payload: ManagerCreate) => {
    const newManager = await prisma.manager.create({ data: payload });

    return newManager;
  };

  public findAll = async () => {
    return await prisma.manager.findMany();
  };

  public findOne = async (managerId: number) => {
    const foundManager = await prisma.manager.findUnique({
      where: { id: managerId },
    });

    if (!foundManager) {
      throw new ApiError("Manager not found", 404);
    }

    return foundManager;
  };
}
