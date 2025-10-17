import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProducingDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsBoolean()
  producing: boolean;
}
