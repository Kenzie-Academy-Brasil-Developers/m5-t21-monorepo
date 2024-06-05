import { Dev, DevCreate } from "../interfaces";
import { prisma } from "../../prisma/prisma.client";
import { ApiError } from "../errors";

export class DevService {
  public create = async (payload: DevCreate) => {
    const newDev = await prisma.dev.create({ data: payload });

    return newDev;
  };

  public findAll = async () => {
    return await prisma.dev.findMany();
  };

  public findOne = async (devId: number) => {
    const foundDev = await prisma.dev.findUnique({
      where: { id: devId },
    });

    if (!foundDev) {
      throw new ApiError("Dev not found", 404);
    }

    return foundDev;
  };
}
