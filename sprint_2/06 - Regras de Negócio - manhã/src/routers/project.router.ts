import { Router } from "express";
import { ProjectController } from "../controllers";
import { validateBody } from "../middlewares";
import { addDevToProjectSchema, projectCreateSchema } from "../schemas";

export const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.get("", projectController.findAll);
projectRouter.post(
  "",
  validateBody(projectCreateSchema),
  projectController.create
);
projectRouter.get("/:projectId", projectController.findOne);
projectRouter.post(
  "/:projectId/devs",
  validateBody(addDevToProjectSchema),
  projectController.addDev
);
