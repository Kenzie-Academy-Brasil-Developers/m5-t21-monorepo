import { Router } from "express";
import { ManagerController } from "../controllers";
import { validateBody } from "../middlewares";
import { managerCreateSchema } from "../schemas";

export const managerRouter = Router();

const managerController = new ManagerController();

managerRouter.get("", managerController.findAll);

managerRouter.post(
  "",
  validateBody(managerCreateSchema),
  managerController.create
);

managerRouter.get("/:managerId", managerController.findOne);

managerRouter.delete("/:managerId", managerController.delete);
