import { Router } from "express";
import { BookController } from "./controller";
import { container } from "tsyringe";
import { validateBody } from "../@shared/validators/body-validator.middleware";
import { bookCreateSchema } from "./schemas";
import { handlePaginationParams } from "../@shared/pagination";

export const bookRouter = Router();

const bookController = container.resolve(BookController);

bookRouter.post("", validateBody(bookCreateSchema), bookController.create);
bookRouter.get("", handlePaginationParams, bookController.list);
