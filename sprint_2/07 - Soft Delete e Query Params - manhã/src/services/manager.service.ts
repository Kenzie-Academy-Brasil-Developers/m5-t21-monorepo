import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Manager, ManagerCreate } from "../interfaces";

export class ManagerService {
  public findByEmail = async (email: string) => {
    const manager = await prisma.manager.findUnique({
      where: { email },
    });

    return manager;
  };

  public create = async (payload: ManagerCreate) => {
    const hasDuplicatedEmail = await this.findByEmail(payload.email);

    if (hasDuplicatedEmail) {
      throw new ApiError("Email already exits", 409);
    }

    const manager = await prisma.manager.create({ data: payload });

    return manager;
  };

  public findAll = async () => {
    // SELECT * FROM "Manager";
    return await prisma.manager.findMany({ where: { isActive: true } });
  };

  public findOne = async (managerId: number) => {
    const manager = await prisma.manager.findUnique({
      where: { id: managerId, isActive: true },
    });

    if (!manager) {
      throw new ApiError("Manager not found", 404);
    }

    return manager;
  };

  public delete = async (managerId: number) => {
    /*
      ON DELETE
        - CASCADE -> Todas as dependencias serão deletadas em cascata.
        - RESTRICT -> Não deixa a deleção ser executada caso o registro contenha dependencias
        - SET NULL -> Registro será deletado, e as FK das dependencias será atualizada para null
        - SET DEFAULT -> Registro será deletado, e as FK das dependecias será atualizada para um valor default X
    */

    await this.findOne(managerId);
    // await prisma.manager.delete({ where: { id: managerId } });

    // SOFT DELETE - Não necessariamente deletar o registro, mas sim 'inativa-lo'
    await prisma.manager.update({
      where: { id: managerId },
      data: { isActive: false },
    });
  };
}
