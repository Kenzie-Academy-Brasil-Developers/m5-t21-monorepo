import { Router } from "express";
import { DevController } from "../controllers";
import { validateBody } from "../middlewares";
import { devCreateSchema } from "../schemas";

export const devRouter = Router();
const devController = new DevController();

devRouter.get("", devController.findAll);
devRouter.post("", validateBody(devCreateSchema), devController.create);
devRouter.get("/:id", devController.findOne);
