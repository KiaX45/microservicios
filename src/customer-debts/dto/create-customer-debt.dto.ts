import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCustomerDebtDto {
  @IsNotEmpty()
  @IsString()
  user_id: string; // ID del usuario asociado a la deuda

  @IsNotEmpty()
  @IsString()
  description: string; // Descripción de la deuda

  @IsNotEmpty()
  @IsNumber()
  amount: number; // Monto de la deuda

  @IsOptional()
  @IsString()
  condition?: string; // Estado de la deuda (opcional, por defecto "pendiente")
}