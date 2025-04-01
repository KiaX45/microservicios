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

/* 
Body example:
{
  "user_id": "ed0bbb21-0373-4f08-a390-3b3f78687a97",
  "description": "Deuda por servicio de internet",
  "amount": 150.00,
  "condition": "pendiente"
}

*/