import express from "express";
import "express-async-errors";
import { managerRouter, projectRouter } from "./routers";
import { handleGlobalErrors } from "./errors/handle.errors";

const app = express();
app.use(express.json());

app.use("/managers", managerRouter);
app.use("/projects", projectRouter);

/* TODO:
- Implementar rotas/controllers/services/interfaces para TASKS
- Implementar gerenciador de erros globais
*/

app.use(handleGlobalErrors);
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
