import { Express, Router } from "express";
import { bookRouter } from "./api/books";
import { memberRouter } from "./api/members";
import { loanRouter } from "./api/loans/router";

export function initRoutes(app: Express) {
  const v1Router = Router();

  v1Router.use("/books", bookRouter);
  v1Router.use("/members", memberRouter);
  v1Router.use("/loans", loanRouter);

  app.use("/api", v1Router);
}
