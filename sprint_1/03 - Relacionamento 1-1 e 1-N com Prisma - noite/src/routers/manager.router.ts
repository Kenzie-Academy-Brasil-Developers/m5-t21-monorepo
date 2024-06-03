import { Router } from "express";
import { ManagerController } from "../controllers";

export const managerRouter = Router();

const managerController = new ManagerController();

managerRouter.get("", managerController.findAll);
managerRouter.post("", managerController.create);
managerRouter.get("/:managerId", managerController.findOne);
