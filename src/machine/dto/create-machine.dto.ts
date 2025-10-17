import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateMachineDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsBoolean()
  @IsOptional()
  producing?: boolean;

  @IsUUID()
  @IsOptional()
  customerId: string;
}
