import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BandsService } from 'src/bands/bands.service';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bandService: BandsService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    // Precisarei do serviço de bands para validar se o bandId existe.
    await this.bandService.findById(createTrackDto.bandId);

    const track = new TrackEntity(createTrackDto);

    const createdTrack = await this.prisma.track.create({ data: track });

    return createdTrack;
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track id ${id} not found`);
    }

    return track;
  }

  // TODO: Implementar o update e o remove.
  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
