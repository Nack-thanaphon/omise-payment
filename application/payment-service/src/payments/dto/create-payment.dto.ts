import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { PaymentMethod } from '../../database/entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @IsString()
  @IsOptional()
  seat_id?: string;

  @IsEmail()
  @IsOptional()
  customer_email?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
