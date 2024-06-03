import express from "express";
import { managerRouter, projectRouter } from "./routers";

const app = express();
app.use(express.json());

app.use("/managers", managerRouter);
app.use("/projects", projectRouter);

/* TODO:
  - Implementar rotas/controllers/services/interfaces para TASKS
  - Implementar gerenciador de erros globais
  - Implementar retorno de dados pelo schema.
*/

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
