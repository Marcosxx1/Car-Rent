import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ValidateCategory {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;

}