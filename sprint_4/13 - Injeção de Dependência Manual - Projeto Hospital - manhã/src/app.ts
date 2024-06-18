import express from "express";
import "express-async-errors";
import { initRoutes } from "./routes";
import { handleGlobalErrors } from "./api/@shared/errors";

export const app = express();

app.use(express.json());

initRoutes(app);

app.use(handleGlobalErrors);
