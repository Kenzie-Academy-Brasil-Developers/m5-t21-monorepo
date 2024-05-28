export type Manager = {
  id: number;
  name: string;
  email: string;
};

export type ManagerCreate = Omit<Manager, "id">;
