import { prisma } from "../../../prisma/prisma.client";
import { PatientCreate, IPatientService } from "./interfaces";
import { injectable } from "tsyringe";

@injectable()
export class PatientService implements IPatientService {
  public create = async (payload: PatientCreate) => {
    const patient = await prisma.patient.create({
      data: payload,
    });

    return patient;
  };

  public findAll = async () => {
    const patients = await prisma.patient.findMany();

    return patients;
  };
}
