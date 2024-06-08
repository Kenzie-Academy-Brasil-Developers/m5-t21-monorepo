import { Manager, ManagerCreate, ManagerUpdate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { ApiError, DuplicatedEmailError } from "../errors";

export class ManagerService {
  public findByEmail = async (email: string) => {
    return await prisma.manager.findUnique({ where: { email } });
  };

  public create = async (payload: ManagerCreate) => {
    const isEmailDuplicated = await this.findByEmail(payload.email);

    if (isEmailDuplicated) {
      throw new DuplicatedEmailError();
    }

    const newManager = await prisma.manager.create({ data: payload });

    return newManager;
  };

  public findAll = async () => {
    return await prisma.manager.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
    });
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

  /*
  PATCH -> Atualiza parcialmente um registro (1campo, 2campos, todos os campos)
  PUT   -> Quero atualizar um registro em TODOS os campos 
  */
  public update = async (managerId: number, payload: ManagerUpdate) => {
    await this.findOne(managerId);

    if (payload.email) {
      const isEmailDuplicated = await this.findByEmail(payload.email);

      if (isEmailDuplicated) {
        throw new DuplicatedEmailError();
      }
    }

    return await prisma.manager.update({
      data: payload,
      where: { id: managerId },
    });
  };

  public delete = async (managerId: number) => {
    await this.findOne(managerId);

    // Soft Delete
    await prisma.manager.update({
      where: { id: managerId },
      data: { isActive: false },
    });
  };
}
