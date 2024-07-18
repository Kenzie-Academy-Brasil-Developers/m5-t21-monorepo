import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass, plainToInstance } from 'class-transformer';

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

    // forma 1:
    // const { password, ...rest } = createdUser;
    // return rest;

    // forma 2:
    // return plainToClass(UserEntity, createdUser);
    return plainToInstance(UserEntity, createdUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    // return users.map((user) => plainToClass(UserEntity, user));
    return plainToInstance(UserEntity, users);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
