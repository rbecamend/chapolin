import { PartialType } from '@nestjs/mapped-types';
import { CreateNupDto } from './create-nup.dto';

export class UpdateNupDto extends PartialType(CreateNupDto) {}
