import { Router } from "express";
import { ManagerController } from "../controllers";
import { validateBody } from "../middlewares";
import { managerCreateSchema, managerUpdateSchema } from "../schemas";

export const managerRouter = Router();
const managerController = new ManagerController();

managerRouter.get("", managerController.findAll);

managerRouter.post(
  "",
  validateBody(managerCreateSchema),
  managerController.create
);

managerRouter.get("/:id", managerController.findOne);

/*
  PATCH -> Atualização PARCIAL
  PUT -> Atualização COMPLETA (configurações de segurança)
*/
managerRouter.patch(
  "/:id",
  validateBody(managerUpdateSchema),
  managerController.update
);

managerRouter.delete("/:id", managerController.delete);
