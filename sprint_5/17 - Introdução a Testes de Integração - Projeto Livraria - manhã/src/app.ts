import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { initRoutes } from "./routes";

export const app = express();

app.use(express.json());

initRoutes(app);
