import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateFinancingDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  workplace: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  employmentStatus: string;
  @Type(() => Number)
  @IsNumber()
  monthlySalary: number;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  currentInstallments?: number;
  @Type(() => Number)
  @IsNumber()
  carId: number;
}
