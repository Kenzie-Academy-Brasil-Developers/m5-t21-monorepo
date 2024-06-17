import { Router } from "express";
import { AccountController } from "./controller";
import { validateBody } from "../@shared/validators";
import { accountCreateSchema, accountUpdateSchema } from "./schemas";
import { isAuthenticated } from "../session/middlewares";
import { isAccountOwner } from "./middlewares";
import { AccountService } from "./service";
import { InMemoryAccountService } from "./inMemory.service";

export const accountRouter = Router();
// const accountService = new AccountService();
const inMemoryAccountService = new InMemoryAccountService();

// const accountController = new AccountController(accountService);
const accountController = new AccountController(inMemoryAccountService);

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
