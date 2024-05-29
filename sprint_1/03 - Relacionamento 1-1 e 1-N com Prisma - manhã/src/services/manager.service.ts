import { prisma } from "../../prisma/prisma.client";
import { Manager, ManagerCreate } from "../interfaces";

export class ManagerService {
  public create = async (payload: ManagerCreate): Promise<Manager> => {
    // const newManager = await prisma.manager.create({ data: payload });
    // return newManager;

    return await prisma.manager.create({ data: payload });
  };

  public findAll = async (): Promise<Manager[]> => {
    // SELECT * FROM "Manager";
    return await prisma.manager.findMany();
  };

  public findOne = async (managerId: number): Promise<Manager | null> => {
    return await prisma.manager.findFirst({ where: { id: managerId } });
  };
}
