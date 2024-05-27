import { Manager, ManagerCreate } from "./interfaces";

export class ManagerService {
  // GENERICS DO TS
  // private managerDatabase: Array<Manager> = [];
  private managerDatabase: Manager[] = [
    { id: 3, name: "patricia", email: "patricia@kenzie.com.br" },
    { id: 1, name: "bruna", email: "bruna@kenzie.com.br" },
  ];

  // 1 - length
  private generateNextId = () => {
    // 1.
    // const dbLen = this.managerDatabase.length;
    // return dbLen + 1;

    // 2. O ultimo item de um array -> sempre estará no seu tamanho -1
    // const dbLen = this.managerDatabase.length;
    // return this.managerDatabase[dbLen - 1].id + 1;

    // array[-1]
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
    const foundManager = this.managerDatabase.find(
      (manager) => manager.id === managerId
    );

    return foundManager;
  };
}
