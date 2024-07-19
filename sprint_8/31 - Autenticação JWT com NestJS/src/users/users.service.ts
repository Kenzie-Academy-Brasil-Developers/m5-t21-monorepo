import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const duplicatedEmail = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (duplicatedEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = new UserEntity(createUserDto);
    await user.hashPassword();

    const createdUser = await this.prisma.user.create({ data: user });

    return plainToInstance(UserEntity, createdUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return plainToInstance(UserEntity, users);
  }

  async findById(id: string) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserEntity, foundUser);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
