import { IsUUID } from 'class-validator';

export class AddPlaylistTrackDto {
  @IsUUID('4')
  trackId: string;
}
