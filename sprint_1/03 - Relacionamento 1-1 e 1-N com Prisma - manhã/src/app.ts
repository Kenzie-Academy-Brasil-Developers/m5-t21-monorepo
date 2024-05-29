import express from "express";
import { ManagerController, ProjectController } from "./controllers";

const app = express();
app.use(express.json());

const managerController = new ManagerController();
const projectController = new ProjectController();

// Managers
app.get("/managers", managerController.findAll);
app.post("/managers", managerController.create);
app.get("/managers/:id", managerController.findOne);

// Project
app.post("/projects", projectController.create);
app.get("/projects", projectController.findAll);
app.get("/projects/:projectId", projectController.findOne);

/* TODO:
  - Implementar rotas/controllers/services/interfaces para TASKS
*/

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
