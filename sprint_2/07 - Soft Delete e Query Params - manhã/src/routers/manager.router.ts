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

managerRouter.get("/:id", managerController.findOne);

managerRouter.delete("/:id", managerController.delete);
