import { injectable } from "tsyringe";
import { IPatientService, PatientCreate } from "./interfaces";
import { prisma } from "../../../prisma/prisma.client";
import { PatientEmailAlreadyUsedError } from "./errors";

@injectable()
export class PatientService implements IPatientService {
  public findByEmail = async (email: string) => {
    const patient = prisma.patient.findUnique({ where: { email } });

    return patient;
  };

  public create = async (payload: PatientCreate) => {
    const hasDuplicatedEmail = await this.findByEmail(payload.email);

    if (hasDuplicatedEmail) {
      throw new PatientEmailAlreadyUsedError();
    }

    const patient = await prisma.patient.create({ data: payload });

    return patient;
  };

  public findAll = async () => {
    return await prisma.patient.findMany();
  };
}
