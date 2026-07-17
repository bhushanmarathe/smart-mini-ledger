import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  title!: string;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsString()
  category!: string;

  @IsDateString()
  date!: string;
}
