import { Module } from '@nestjs/common';
import { BandsController } from './bands.controller';
import { BandsService } from './bands.service';

@Module({
  imports: [],
  controllers: [BandsController],
  providers: [BandsService],
})
export class BandsModule {}
