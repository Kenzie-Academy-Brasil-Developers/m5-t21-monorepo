import { Express, Router } from "express";
import { bookRouter } from "./api/books";

export function initRoutes(app: Express) {
  const v1Router = Router();

  v1Router.use("/books", bookRouter);

  app.use("/api", v1Router);
}
