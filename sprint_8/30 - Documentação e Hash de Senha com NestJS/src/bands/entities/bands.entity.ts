import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/utils/base.entity';

export class BandEntity extends BaseEntity {
  @ApiProperty({
    example: 'c9aefb09-93ce-4cba-98cc-423ab2dcd67c',
    description: 'Unique identifier (UUIDv4)',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Band 1',
    description: 'Band name',
  })
  public name: string;

  @ApiProperty({
    example: 1995,
    description: 'Band foundation year',
  })
  public formationYear: number;

  constructor(props: { name: string; formationYear: number }) {
    super();
    Object.assign(this, props);
  }
}
