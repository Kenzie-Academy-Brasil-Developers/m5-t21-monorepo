import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandService: BandsService) {}

  @Get()
  public async findAll() {
    return await this.bandService.findAll();
  }

  @Post()
  public async create(@Body() payload: CreateBandDto) {
    return await this.bandService.create(payload);
  }

  @Get(':bandId')
  public async findById(@Param('bandId') bandId: string) {
    return await this.bandService.findById(bandId);
  }

  @Delete(':bandId')
  @HttpCode(204)
  public async delete(@Param('bandId') bandId: string) {
    await this.bandService.delete(bandId);
  }

  @Patch(':bandId')
  public partialUpdate(
    @Param('bandId') bandId: string,
    @Body() payload: UpdateBandDto,
  ) {
    return this.bandService.partialUpdate(bandId, payload);
  }
}
