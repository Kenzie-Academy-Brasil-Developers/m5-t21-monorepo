import express from "express";
import "express-async-errors";
import { managerRouter, projectRouter } from "./routers";
import { handleGlobalErrors } from "./errors";

const app = express();
app.use(express.json());

app.use("/managers", managerRouter);
app.use("/projects", projectRouter);

app.use(handleGlobalErrors);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

/*
  TODO:
  - Desenvolver rota de tasks para criar uma task (router, controller, service, interface)
*/
