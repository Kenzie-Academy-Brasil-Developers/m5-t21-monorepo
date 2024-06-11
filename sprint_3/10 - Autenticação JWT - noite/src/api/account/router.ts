import { Router } from "express";
import { AccountController } from "./controller";
import { validateBody } from "../@shared/validators";
import { accountCreateSchema } from "./schemas";

export const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post(
  "",
  validateBody(accountCreateSchema),
  accountController.create
);
