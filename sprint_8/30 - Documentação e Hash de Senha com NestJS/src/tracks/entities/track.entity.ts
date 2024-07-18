import { BaseEntity } from 'src/utils/base.entity';

export class TrackEntity extends BaseEntity {
  public readonly id: string;
  public title: string;
  public length: number;
  public bandId: string;

  constructor(props: { title: string; length: number; bandId: string }) {
    super();
    Object.assign(this, props);
  }
}
