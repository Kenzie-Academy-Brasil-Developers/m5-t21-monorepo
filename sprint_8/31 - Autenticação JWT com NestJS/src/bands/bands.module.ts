import { Module } from '@nestjs/common';
import { BandsController } from './bands.controller';
import { BandsService } from './bands.service';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BandsController],
  providers: [BandsService, PrismaService],
})
export class BandsModule {}
