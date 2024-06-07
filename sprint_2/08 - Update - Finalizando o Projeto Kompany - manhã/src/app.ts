import express from "express";
import "express-async-errors";
import { devRouter, managerRouter, projectRouter, taskRouter } from "./routers";
import { handleGlobalErrors } from "./errors/handle.errors";

const app = express();
app.use(express.json());

app.use("/managers", managerRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/devs", devRouter);

app.use(handleGlobalErrors);
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
