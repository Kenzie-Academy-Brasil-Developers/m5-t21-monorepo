import { Manager, ManagerCreate } from "./intefaces";

export class ManagerService {
  // GENERIC
  // private managerDatabase: Array<Manager> = [];
  private managerDatabase: Manager[] = [
    { id: 3, name: "Patricia", email: "patricia@kenzie.com.br" },
    { id: 1, name: "Bruna", email: "bruna@kenzie.com.br" },
  ];

  /*
    1. -> Tamanho do array + 1
    2. -> Pegar o id do último elemento e somar 1
      - O ultimo elemento de um array 99% é o tamanho dele - 1
  */
  private generateNextId = () => {
    // 1
    // const dbLen = this.managerDatabase.length;
    // return dbLen + 1;

    // 2 - Caso base -> array está vazio
    // const dbLen = this.managerDatabase.length;
    // const lastManager = this.managerDatabase[dbLen - 1];
    // managerDatabase[-1]
    const lastManager = this.managerDatabase.sort((a, b) => a.id - b.id).at(-1);

    return lastManager ? lastManager.id + 1 : 1;
  };

  public create = (payload: ManagerCreate) => {
    const newManager = {
      id: this.generateNextId(),
      ...payload,
    };

    this.managerDatabase.push(newManager);

    return newManager;
  };

  public findAll = () => {
    return this.managerDatabase;
  };

  public findOne = (managerId: number) => {
    return this.managerDatabase.find((manager) => manager.id === managerId);
  };
}
