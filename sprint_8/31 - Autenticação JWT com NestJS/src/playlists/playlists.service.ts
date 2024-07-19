import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { JwtPayloadDto } from 'src/users/auth/jwt/jwt-payload.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPlaylistTrackDto } from './dto/add-playlist-track.dto';
import { UsersService } from 'src/users/users.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly trackService: TracksService,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: JwtPayloadDto) {
    const playlist = new PlaylistEntity({
      ...createPlaylistDto,
      userId: user.userId,
    });

    const createdPlaylist = await this.prisma.playlist.create({
      data: playlist,
    });

    return createdPlaylist;
  }

  async findAll() {
    return await this.prisma.playlist.findMany();
  }

  async findOne(id: string) {
    const foundPlaylist = await this.prisma.playlist.findUnique({
      where: { id },
    });

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist not found');
    }

    return foundPlaylist;
  }

  async addPlaylistTrack(
    playlistId: string,
    { trackId }: AddPlaylistTrackDto,
    user: JwtPayloadDto,
  ) {
    // Validações necessárias:
    // 1. Usuario existe?
    await this.userService.findById(user.userId);
    // 2. Playlist existe?
    const playlist = await this.findOne(playlistId);
    // 3. Playlist é do usuário?
    if (playlist.userId !== user.userId) {
      throw new ForbiddenException(
        'You dont have permission to add to this playlist',
      );
    }
    // 4. Track existe?
    await this.trackService.findOne(trackId);

    // 5. Conectar a musica a playlist
    const updatedPlaylist = await this.prisma.playlist.update({
      where: { id: playlistId },
      data: { tracks: { connect: { id: trackId } } },
      include: { tracks: true },
    });

    // return { message: 'this action adds a new track to a playlist' };
    return updatedPlaylist;
  }
}
