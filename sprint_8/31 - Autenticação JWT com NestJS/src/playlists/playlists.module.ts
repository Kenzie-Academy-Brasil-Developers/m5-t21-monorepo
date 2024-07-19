import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [UsersModule, TracksModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PrismaService],
})
export class PlaylistsModule {}
