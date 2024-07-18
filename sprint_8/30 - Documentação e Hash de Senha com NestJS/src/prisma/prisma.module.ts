import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}

// @Global()
// @Module({
//   providers: [PrismaService],
// })
// export class PrismaModule {}
