import { BaseEntity } from 'src/utils/base.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

export class UserEntity extends BaseEntity {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(props: CreateUserDto) {
    super();
    Object.assign(this, props);
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
