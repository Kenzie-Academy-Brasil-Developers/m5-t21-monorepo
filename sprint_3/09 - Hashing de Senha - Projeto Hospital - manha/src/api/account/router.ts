import { Router } from "express";
import { AccountController } from "./controller";

export const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post("", accountController.create);
accountRouter.get("", accountController.findAll);
