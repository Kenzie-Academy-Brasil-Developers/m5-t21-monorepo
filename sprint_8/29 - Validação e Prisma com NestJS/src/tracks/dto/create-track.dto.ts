import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public title: string;

  @IsInt()
  @IsPositive()
  public length: number;

  @IsUUID('4')
  public bandId: string;
}
