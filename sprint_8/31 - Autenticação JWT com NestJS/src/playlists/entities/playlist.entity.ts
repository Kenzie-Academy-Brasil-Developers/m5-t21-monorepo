import { BaseEntity } from 'src/utils/base.entity';

export class PlaylistEntity extends BaseEntity {
  readonly id: string;
  title: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  userId: string;

  constructor(props: Partial<PlaylistEntity>) {
    super();
    Object.assign(this, props);
  }
}
