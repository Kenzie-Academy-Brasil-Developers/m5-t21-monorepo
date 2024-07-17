import { randomUUID } from 'crypto';

class BandEntity {
  public readonly id: string;
  public name: string;
  public formationYear: number;

  constructor(props: { name: string; formationYear: number }) {
    this.id = randomUUID();
    Object.assign(this, props);
  }
}

const bandPayload = {
  name: 'John Frusciante',
  formationYear: 1994,
};

const band = new BandEntity(bandPayload);
console.log(band);
