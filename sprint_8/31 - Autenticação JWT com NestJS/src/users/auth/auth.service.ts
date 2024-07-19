import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginEntity } from './entities/login.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = new LoginEntity(loginAuthDto);

    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await user.comparePassword(foundUser.password);

    return {
      access_token: await this.jwtService.signAsync({
        sub: foundUser.id,
        email: foundUser.email,
      }),
    };
  }
}
