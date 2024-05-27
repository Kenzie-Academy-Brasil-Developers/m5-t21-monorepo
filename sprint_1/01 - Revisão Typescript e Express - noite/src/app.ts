import { ManagerService } from "./services";
import express from "express";

const app = express();
app.use(express.json());

const managerService = new ManagerService();

app.get("/", (req, res) => {
  return res.json({ message: "olá mundo" });
});

app.get("/managers", (req, res) => {
  const managers = managerService.findAll();

  return res.json(managers);
});

app.post("/managers", (req, res) => {
  // console.log(req.body);
  const manager = managerService.create(req.body);

  return res.status(201).json(manager);
});

app.get("/managers/:managerId", (req, res) => {
  // console.log(req.params);
  // console.log(req.params.managerId);
  const manager = managerService.findOne(Number(req.params.managerId));

  // early error return
  if (!manager) {
    return res.status(404).json({ error: "Manager not found" });
  }

  return res.json(manager);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
