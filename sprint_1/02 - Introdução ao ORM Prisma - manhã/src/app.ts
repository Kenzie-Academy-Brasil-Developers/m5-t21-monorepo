import express from "express";
import { ManagerController } from "./controllers";

const app = express();
app.use(express.json());

const managerController = new ManagerController();

app.get("/managers", managerController.findAll);
app.post("/managers", managerController.create);
app.get("/managers/:id", managerController.findOne);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
