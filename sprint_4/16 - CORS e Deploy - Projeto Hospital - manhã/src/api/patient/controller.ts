import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IPatientService } from "./interfaces";

@injectable()
export class PatientController {
  constructor(
    @inject("PatientService") private patientService: IPatientService
  ) {}

  public create = async (req: Request, res: Response) => {
    // console.log("@@@@@@@@@");
    // console.log(req.body);
    // console.log("@@@@@@@@@");

    const patient = await this.patientService.create(req.body);

    return res.status(201).json(patient);
  };

  public findAll = async (req: Request, res: Response) => {
    const patients = await this.patientService.findAll();

    return res.status(200).json(patients);
  };
}
