import { randomUUID } from 'crypto';

export class BandEntity {
  public readonly id: string;
  public name: string;
  public formationYear: number;

  constructor(props: { name: string; formationYear: number }) {
    this.id = randomUUID();
    Object.assign(this, props);
  }
}
