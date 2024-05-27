import { ManagerService } from "./services";

const payload1 = {
  name: "Chrystian",
  email: "chrystian@kenzie.com.br",
};

const payload2 = {
  name: "Pedro",
  email: "pedro@kenzie.com.br",
};

const managerService = new ManagerService();

const manager1 = managerService.create(payload1);
const manager2 = managerService.create(payload2);

console.log("");
console.log(managerService.findAll());
