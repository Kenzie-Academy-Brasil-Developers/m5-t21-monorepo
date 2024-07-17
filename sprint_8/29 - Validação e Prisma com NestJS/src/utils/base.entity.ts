import { randomUUID } from 'crypto';

export class BaseEntity {
  public readonly id: string;

  constructor() {
    this.id = randomUUID();
  }
}
