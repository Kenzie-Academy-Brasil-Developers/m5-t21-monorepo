import { accountRouter } from "./api/account";
import { Express, Router } from "express";
import { sessionRouter } from "./api/session";
import { patientRouter } from "./api/patient";

export function initRoutes(app: Express) {
  const v1Router = Router();

  // /api/v1/accounts
  v1Router.use("/v1/accounts", accountRouter);
  v1Router.use("/v1/login", sessionRouter);
  v1Router.use("/v1/patients", patientRouter);

  app.use("/api", v1Router);
}
