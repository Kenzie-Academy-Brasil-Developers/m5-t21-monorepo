import { Router } from "express";
import { BookController } from "./controller";
import { container } from "tsyringe";

export const bookRouter = Router();

const bookController = container.resolve(BookController);

bookRouter.post("", bookController.create);
bookRouter.get("", bookController.list);
