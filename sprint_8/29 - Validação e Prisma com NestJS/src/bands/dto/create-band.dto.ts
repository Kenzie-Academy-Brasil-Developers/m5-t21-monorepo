// DTO -> Data Transfer Object
// DDD (Domain Driven Design), Clean Arch

import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public name: string;

  @IsInt()
  @IsPositive()
  public formationYear: number;
}
