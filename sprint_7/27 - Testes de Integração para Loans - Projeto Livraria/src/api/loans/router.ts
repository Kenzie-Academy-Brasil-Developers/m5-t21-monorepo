import { Router } from "express";
import { LoanController } from "./controller";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators/body-validator.middleware";
import { loanCreateSchema } from "./schemas";
import { handlePaginationParams } from "../@shared/pagination";

export const loanRouter = Router();

const loanController = container.resolve(LoanController);

loanRouter.post("", validateBody(loanCreateSchema), loanController.create);
