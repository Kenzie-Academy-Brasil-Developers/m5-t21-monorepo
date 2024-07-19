import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { JwtAuthGuard } from 'src/users/auth/jwt/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayloadDto } from 'src/users/auth/jwt/jwt-payload.dto';
import { AddPlaylistTrackDto } from './dto/add-playlist-track.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Req() req: Request,
  ) {
    console.log('POST /playlists', req.user);
    return await this.playlistsService.create(
      createPlaylistDto,
      req.user as JwtPayloadDto,
    );
  }

  @Get()
  async findAll() {
    return await this.playlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistsService.findOne(id);
  }

  // /playlists/:id/tracks
  // somente o dono da playlist poderá adicionar musicas a ela
  @Post(':id/tracks')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async addPlaylistTrack(
    @Param('id') playlistId: string,
    @Body() addPlaylistDto: AddPlaylistTrackDto,
    @Req() req: Request,
  ) {
    return await this.playlistsService.addPlaylistTrack(
      playlistId,
      addPlaylistDto,
      req.user as JwtPayloadDto,
    );
  }
}
