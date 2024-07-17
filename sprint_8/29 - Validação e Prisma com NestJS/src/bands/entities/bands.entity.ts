import { BaseEntity } from 'src/utils/base.entity';

export class BandEntity extends BaseEntity {
  public readonly id: string;
  public name: string;
  public formationYear: number;

  constructor(props: { name: string; formationYear: number }) {
    super();
    Object.assign(this, props);
  }
}
