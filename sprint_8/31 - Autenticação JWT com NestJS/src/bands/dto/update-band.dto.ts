// DTO -> Data Transfer Object
// DDD (Domain Driven Design), Clean Arch

import { PartialType } from '@nestjs/mapped-types';
import { CreateBandDto } from './create-band.dto';

// Opinionated (Framework que tem um 'opiniao' forte sobre a arquitetura/forma de organizar o projeto)
export class UpdateBandDto extends PartialType(CreateBandDto) {}
