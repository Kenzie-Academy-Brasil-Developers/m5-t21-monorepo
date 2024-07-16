import { Injectable, NotFoundException } from '@nestjs/common';
import { BandEntity } from './entities/bands.entity';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Injectable()
export class BandsService {
  private readonly database: Array<BandEntity> = [];

  public findAll() {
    return this.database;
  }

  public create(payload: CreateBandDto) {
    const band = new BandEntity(payload);
    this.database.push(band);

    return band;
  }

  public findById(bandId: string) {
    const foundBand = this.database.find(({ id }) => id === bandId);

    if (!foundBand) {
      throw new NotFoundException('Band not found');
    }

    return foundBand;
  }

  public delete(bandId: string) {
    const foundBandIndex = this.database.findIndex(({ id }) => id === bandId);

    if (foundBandIndex === -1) {
      throw new NotFoundException('Band not found');
    }

    // SPLICE
    this.database.splice(foundBandIndex, 1);
  }

  public partialUpdate(bandId: string, payload: UpdateBandDto) {
    const foundBand = this.database.find(({ id }) => id === bandId);

    if (!foundBand) {
      throw new NotFoundException('Band not found');
    }

    Object.assign(foundBand, payload);

    return foundBand;
  }
}
