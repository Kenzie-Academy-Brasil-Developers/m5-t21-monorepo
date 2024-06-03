import { Router } from "express";
import { ProjectController } from "../controllers";

export const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.get("", projectController.findAll);
projectRouter.post("", projectController.create);
projectRouter.get("/:projectId", projectController.findOne);
