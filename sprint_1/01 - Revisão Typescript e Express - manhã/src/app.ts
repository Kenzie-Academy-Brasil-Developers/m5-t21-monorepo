import { ManagerService } from "./services";
import express from "express";

const app = express();
app.use(express.json());
const managerService = new ManagerService();

app.get("/", (req, res) => {
  return res.json({ message: "ola mundo" });
});

app.get("/managers", (req, res) => {
  return res.json(managerService.findAll());
});

app.post("/managers", (req, res) => {
  console.log(req.body);
  const manager = managerService.create(req.body);

  return res.status(201).json(manager);
});

app.get("/managers/:id", (req, res) => {
  console.log(req.params.id);
  console.log(typeof req.params.id);

  const foundManager = managerService.findOne(Number(req.params.id));

  if (!foundManager) {
    return res.status(404).json({ error: "Manager not found" });
  }

  return res.json(foundManager);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
