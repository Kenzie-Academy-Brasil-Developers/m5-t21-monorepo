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
import { ApiBody, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { BandEntity } from './entities/bands.entity';

@ApiTags('bands')
@Controller('bands')
export class BandsController {
  constructor(private readonly bandService: BandsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: BandEntity,
    isArray: true,
  })
  public async findAll() {
    return await this.bandService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: BandEntity,
  })
  public async create(@Body() payload: CreateBandDto) {
    return await this.bandService.create(payload);
  }

  @Get(':bandId')
  @ApiResponse({
    status: 200,
    type: BandEntity,
  })
  public async findById(@Param('bandId') bandId: string) {
    return await this.bandService.findById(bandId);
  }

  @Delete(':bandId')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'No content',
  })
  public async delete(@Param('bandId') bandId: string) {
    await this.bandService.delete(bandId);
  }

  @Patch(':bandId')
  @ApiResponse({
    status: 200,
    type: BandEntity,
  })
  @ApiBody({ type: PartialType(CreateBandDto) })
  public partialUpdate(
    @Param('bandId') bandId: string,
    @Body() payload: UpdateBandDto,
  ) {
    return this.bandService.partialUpdate(bandId, payload);
  }
}
