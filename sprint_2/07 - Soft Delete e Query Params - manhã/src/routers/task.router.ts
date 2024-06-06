import { Router } from "express";
import { TaskController } from "../controllers";
import { validateBody } from "../middlewares";
import { taskCreateSchema } from "../schemas";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get("", taskController.findAll);
taskRouter.post("", validateBody(taskCreateSchema), taskController.create);
taskRouter.get("/:id", taskController.findOne);
