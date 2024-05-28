import { prisma } from "../../prisma/prisma.client";
import { Manager, ManagerCreate } from "../intefaces";

export class ManagerService {
  public create = async (payload: ManagerCreate) => {
    // const newManager = await prisma.manager.create({ data: payload });
    // return newManager;

    return await prisma.manager.create({ data: payload });
  };

  public findAll = async () => {
    // SELECT * FROM "Manager";
    return await prisma.manager.findMany();
  };

  public findOne = async (managerId: number) => {
    return await prisma.manager.findFirst({ where: { id: managerId } });
  };
}
