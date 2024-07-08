import { Router } from "express";
import { MemberController } from "./controller";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators/body-validator.middleware";
import { memberCreateSchema } from "./schemas";
import { handlePaginationParams } from "../@shared/pagination";

export const memberRouter = Router();

const memberController = container.resolve(MemberController);

memberRouter.post(
  "",
  validateBody(memberCreateSchema),
  memberController.create
);

memberRouter.get("", handlePaginationParams, memberController.list);
