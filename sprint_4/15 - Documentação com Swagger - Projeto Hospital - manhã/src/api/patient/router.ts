import { Router } from "express";
import { container } from "tsyringe";
import { PatientController } from "./controller";
import { PatientService } from "./service";
import { validateBody } from "../@shared/validators";
import { patientCreateSchema } from "./schemas";
import { isAuthenticated } from "../session/middlewares";
import { isNurse } from "../account/middlewares";

export const patientRouter = Router();

container.registerSingleton("PatientService", PatientService);
const patientController = container.resolve(PatientController);

// Apenas NURSE pode criar um novo registro de patient
patientRouter.post(
  "",
  isAuthenticated,
  isNurse,
  validateBody(patientCreateSchema),
  patientController.create
);

patientRouter.get("", patientController.findAll);
