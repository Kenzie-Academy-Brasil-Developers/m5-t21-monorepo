import { Manager, ManagerCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors";

export class ManagerService {
  public findByEmail = async (email: string) => {
    return await prisma.manager.findUnique({ where: { email } });
  };

  public create = async (payload: ManagerCreate) => {
    const isEmailDuplicated = await this.findByEmail(payload.email);

    if (isEmailDuplicated) {
      throw new ApiError("Email already used", 409);
    }

    const newManager = await prisma.manager.create({ data: payload });

    return newManager;
  };

  public findAll = async () => {
    return await prisma.manager.findMany({ where: { isActive: true } });
  };

  public findOne = async (managerId: number) => {
    const foundManager = await prisma.manager.findUnique({
      where: { id: managerId, isActive: true },
    });

    if (!foundManager) {
      throw new ApiError("Manager not found", 404);
    }

    return foundManager;
  };

  public delete = async (managerId: number) => {
    /*
      204 (No Content) sem body
      200 (OK) com o dado deletado
      202 (Accepted) sem body
    */
    await this.findOne(managerId);

    // await prisma.manager.delete({ where: { id: managerId } });

    // Soft Delete
    await prisma.manager.update({
      where: { id: managerId },
      data: { isActive: false },
    });
  };
}
