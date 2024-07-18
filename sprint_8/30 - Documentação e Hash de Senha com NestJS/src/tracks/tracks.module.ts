import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BandsService } from 'src/bands/bands.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService, BandsService],
})
export class TracksModule {}
