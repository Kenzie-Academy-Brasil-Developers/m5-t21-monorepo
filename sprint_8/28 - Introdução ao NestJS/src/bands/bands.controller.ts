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

@Controller('bands')
export class BandsController {
  constructor(private readonly bandService: BandsService) {}

  @Get()
  public findAll() {
    return this.bandService.findAll();
  }

  @Post()
  public create(@Body() payload) {
    return this.bandService.create(payload);
  }

  @Get(':bandId')
  public findById(@Param('bandId') bandId: string) {
    return this.bandService.findById(bandId);
  }

  @Delete(':bandId')
  @HttpCode(204)
  public delete(@Param('bandId') bandId: string) {
    this.bandService.delete(bandId);
  }

  @Patch(':bandId')
  public partialUpdate(@Param('bandId') bandId: string, @Body() payload) {
    return this.bandService.partialUpdate(bandId, payload);
  }
}
