import { Router } from "express";
import { MemberController } from "./controller";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators/body.validator";
import { memberCreateSchema } from "./schemas";

export const memberRouter = Router();

const memberController = container.resolve(MemberController);

memberRouter.post(
  "",
  validateBody(memberCreateSchema),
  memberController.create
);

