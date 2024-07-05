import { Express, Router } from "express";
import { bookRouter } from "./api/books";
import { memberRouter } from "./api/members";

export function initRoutes(app: Express) {
  const v1Router = Router();

  v1Router.use("/books", bookRouter);
  v1Router.use("/members", memberRouter);

  app.use("/api", v1Router);
}
