import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors/api.errors";
import { Dev, DevCreate } from "../interfaces";

export class DevService {
  public create = async (payload: DevCreate): Promise<Dev> => {
    return await prisma.dev.create({ data: payload });
  };

  public findAll = async (): Promise<Dev[]> => {
    return await prisma.dev.findMany();
  };

  public findOne = async (devId: number) => {
    const dev = await prisma.dev.findUnique({
      where: { id: devId },
    });

    if (!dev) {
      throw new ApiError("Dev not found", 404);
    }

    return dev;
  };
}
