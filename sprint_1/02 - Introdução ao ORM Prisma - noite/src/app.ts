import express from "express";
// import { ManagerController } from "./controllers/manager.controller";
// import { ExemploController } from "./controllers/exemplo.controller";
import { ManagerController, ExemploController } from "./controllers";

const app = express();
app.use(express.json());

const managerController = new ManagerController();

app.get("/managers", managerController.findAll);
app.post("/managers", managerController.create);
app.get("/managers/:managerId", managerController.findOne);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
