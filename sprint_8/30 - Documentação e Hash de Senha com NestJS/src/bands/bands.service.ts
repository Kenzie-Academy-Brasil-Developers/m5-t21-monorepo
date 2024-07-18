import { Injectable, NotFoundException } from '@nestjs/common';
import { BandEntity } from './entities/bands.entity';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BandsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.band.findMany();
  }

  public async create(payload: CreateBandDto) {
    const band = new BandEntity(payload);
    const createdBand = await this.prisma.band.create({ data: band });

    return createdBand;
  }

  public async findById(bandId: string) {
    const foundBand = await this.prisma.band.findUnique({
      where: { id: bandId },
    });

    if (!foundBand) {
      throw new NotFoundException('Band not found');
    }

    return foundBand;
  }

  public async delete(bandId: string) {
    await this.findById(bandId);

    await this.prisma.band.delete({ where: { id: bandId } });
  }

  public async partialUpdate(bandId: string, payload: UpdateBandDto) {
    await this.findById(bandId);

    const updatedBand = await this.prisma.band.update({
      where: { id: bandId },
      data: payload,
    });

    return updatedBand;
  }
}
