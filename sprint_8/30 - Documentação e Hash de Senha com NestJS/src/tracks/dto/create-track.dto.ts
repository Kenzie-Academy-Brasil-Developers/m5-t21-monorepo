import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Required. Song name (max 50 chars)',
    default: 'Song name 1',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Required. Song length in seconds (positive integer)',
    default: 100,
  })
  @IsInt()
  @IsPositive()
  public length: number;

  @ApiProperty({
    description: 'Required. Band UUID to link with song (UUIDv4)',
    default: 'c9aefb09-93ce-4cba-98cc-423ab2dcd67c',
  })
  @IsUUID('4')
  public bandId: string;
}
