// DTO -> Data Transfer Object
// DDD (Domain Driven Design), Clean Arch

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBandDto {
  @ApiProperty({
    description: 'Required. Band name (max 20 chars)',
    default: 'Band 1',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public name: string;

  @ApiProperty({
    description: 'Required. Band foundation year (positive integer)',
    default: 1995,
  })
  @IsInt()
  @IsPositive()
  public formationYear: number;
}
