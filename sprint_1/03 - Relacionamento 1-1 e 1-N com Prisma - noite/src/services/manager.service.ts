import { Manager, ManagerCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";

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

    return foundManager;
  };
}
