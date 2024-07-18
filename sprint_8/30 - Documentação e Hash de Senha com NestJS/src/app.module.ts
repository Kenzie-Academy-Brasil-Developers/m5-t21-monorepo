import { Module } from '@nestjs/common';
import { BandsModule } from './bands/bands.module';
import { TracksModule } from './tracks/tracks.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BandsModule, TracksModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
