import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BandsModule } from './bands/bands.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [BandsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
