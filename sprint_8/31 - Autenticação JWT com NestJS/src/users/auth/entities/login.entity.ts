import { compare } from 'bcryptjs';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { UnauthorizedException } from '@nestjs/common';

export class LoginEntity {
  email: string;
  password: string;

  constructor(props: LoginAuthDto) {
    Object.assign(this, props);
  }

  async comparePassword(hashedPassword: string) {
    const passwordMatch = await compare(this.password, hashedPassword);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
