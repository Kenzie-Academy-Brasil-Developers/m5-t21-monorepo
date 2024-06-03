import express from "express";
import { managerRouter, projectRouter } from "./routers";

const app = express();
app.use(express.json());

app.use("/managers", managerRouter);
app.use("/projects", projectRouter);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

/*
  TODO:
  - Desenvolver rota de tasks para criar uma task (router, controller, service, interface)
*/
