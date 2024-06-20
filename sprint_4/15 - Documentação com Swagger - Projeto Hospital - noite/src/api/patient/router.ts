import { Router } from "express";
import { container } from "tsyringe";
import { PatientController } from "./controller";
import { PatientService } from "./services";
import { validateBody } from "../@shared/validators";
import { patientCreateSchema } from "./schemas";
import { isAuthenticated } from "../session";
import { isNurse } from "../account/middlewares";

export const patientRouter = Router();

container.registerSingleton("PatientService", PatientService);
const patientController = container.resolve(PatientController);

/*
  - Precisa estar autenticado
  - Somente NURSE consiga cadastrar um paciente.
*/
patientRouter.post(
  "",
  isAuthenticated,
  isNurse,
  validateBody(patientCreateSchema),
  patientController.create
);

patientRouter.get("", patientController.findAll);
