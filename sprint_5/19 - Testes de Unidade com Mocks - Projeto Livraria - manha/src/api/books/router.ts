import { Router } from "express";
import { BookController } from "./controller";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators/body.validator";
import { bookCreateSchema } from "./schemas";

export const bookRouter = Router();

const bookController = container.resolve(BookController);

bookRouter.post("", validateBody(bookCreateSchema), bookController.create);
bookRouter.get("", bookController.list);
