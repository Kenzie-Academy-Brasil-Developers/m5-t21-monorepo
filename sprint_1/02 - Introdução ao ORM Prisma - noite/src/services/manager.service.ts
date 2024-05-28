import { Manager, ManagerCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";

export class ManagerService {
  public create = async (payload: ManagerCreate) => {
    // INSERT INTO ....
    const newManager = await prisma.manager.create({ data: payload });

    return newManager;
  };

  public findAll = async () => {
    // SELECT * FROM "Manager";
    return await prisma.manager.findMany();
  };

  public findOne = async (managerId: number) => {
    // SELECT * FROM "Manager" WHERE id = 1;
    const foundManager = await prisma.manager.findUnique({
      where: { id: managerId },
    });

    return foundManager;
  };
}
