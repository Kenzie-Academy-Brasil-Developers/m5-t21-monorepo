import { Router } from "express";
import { AccountController } from "./controller";
import { validateBody } from "../@shared/validators";
import { accountCreateSchema, accountUpdateSchema } from "./schemas";
import { isAuthenticated } from "../session/middlewares";
import { isAccountOwner } from "./middlewares";

export const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post(
  "",
  validateBody(accountCreateSchema),
  accountController.create
);

accountRouter.get("", accountController.findAll);

accountRouter.get("/:id", accountController.findById);

/*
  Ordem de verificações:
  1. ACCESS CONTROL LAYER 1 (isAuthenticated)
    1.1. ACCESS CONTROL LAYER 2 (isAccountOwner)
  2. SCHEMA VALIDATION (validateBody)
  3. CONTROLLER METHOD -> (accountController.partialUpdate)
*/
accountRouter.patch(
  "/:id",
  isAuthenticated,
  isAccountOwner,
  validateBody(accountUpdateSchema),
  accountController.partialUpdate
);
