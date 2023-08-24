import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

class ICarDTO {
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  daily_rate: number;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsNotEmpty()
  @IsNumber()
  fine_amount: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  category_id: string;

  @IsNotEmpty()
  @IsDate()
  created_at?: Date;
}

export { ICarDTO }
